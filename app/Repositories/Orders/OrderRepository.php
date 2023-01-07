<?php


namespace App\Repositories\Orders;


use App\Models\Discount;
use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Table;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;

class OrderRepository implements OrderInterface
{
    private $model;

    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    public function create($request)
    {
        $payload = json_decode($request->getContent(), true);
        $order = new Order();
        $order->user_id = auth()->user()->id;
        $order->id = $payload[0]['orderID'];
        if($payload[0]['orderID']!==0){
            $order->tableID = $payload[0]['tableID'];
        }
        else{
            $order->tableID = 0;
        }
        $order->save();

        foreach ($payload as $element) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $element["productId"];
            $orderItem->quantity = $element["quantity"];
            if ($element["orderNote"] !== '') {
                $orderItem->instruction = $element["orderNote"];
            } else {
                $orderItem->instruction = '';
            }
            $orderItem->discount = $element["discount"];
            $orderItem->delivery_method = $element["deliveryMethod"];
            $orderItem->save();

            Table::where('no', $element["tableID"])->update(['status' => 0]);

            Product::where('id', $element["productId"])
                ->increment('sold', $element["quantity"]);
            Product::where('id', $element["productId"])
                ->decrement('stock', $element["quantity"]);
            Inventory::where('product_id',$element["productId"])
                ->decrement('stock',1*$element["quantity"]);
        }

        return [
            'order' => $order,
            'orderItem' => $orderItem
        ];
    }

    public function update($request, int $id)
    {
        $order = $this->model::where('id', $id)->update(['status' => $request->status]);
        if ($request->status === 'delivered') {
            Table::where('no', $request->tableID)->update(['status' => 1]);
        }
        else{
            Table::where('no', $request->tableID)->update(['status' => 0]);
        }

        return $order;
    }

    public function delete($id)
    {
        Artisan::call('cache:clear');

        return $this->model->where('id', $id)->delete();
    }

    public function paginate($perPage = 10)
    {
        return $this->model->orderBy('position', 'asc')->withCount('articles')->paginate($perPage);
    }

    public function OrderInfoWithFilter($status, $userId): array
    {
        $getOrderInfo = $this->model::wherehas('orderItems')
            ->when($status !== 'all' || $userId !== 'all', function ($q) use ($status, $userId) {
                if ($status !== 'all') {
                    return $q->where('status', $status);
                }
                if ($userId !== 'all') {
                    return $q->where('user_id', $userId);
                }
            })
            ->with(['orderItems' => function ($q) {
                $q->with(['products' => function ($sq) {
                    $sq->select('id', 'title', 'price');
                }]);
            }])->with(['users' => function ($q) use ($userId) {
                if ($userId != 'all') {
                    $q->select('id', 'first_name', 'last_name')->where('id', $userId);
                }
            }])
            ->orderBy('updated_at', 'DESC')
            ->get();

        return [
            'getOrderInfo' => $getOrderInfo,
        ];
    }

    public function mostOrdered()
    {
        return Product::select('id', 'title', 'sold', 'image')
            ->orderBy('sold', 'DESC')
            ->get();
    }

    public function mostOrderedToday()
    {
        return Product::where('updated_at', '>', Carbon::now()->subDays(1))
            ->select('id', 'title', 'sold', 'image')
            ->orderBy('sold', 'DESC')
            ->get();
    }

    public function businessSummery(): array
    {

        $orders = $this->model::wherehas('orderItems')
            ->with(['orderItems' => function ($q) {
                $q->with(['products' => function ($sq) {
                    $sq->select('id', 'title', 'price');
                }]);
            }])
            ->with(['users' => function ($q) {
                $q->select('first_name', 'last_name', 'id');
            }])
            ->get();

        $totalPayment = [];
        $orderedDishes = [];

        $totalPaymentLastWeek = [];
        $totalPaymentPastWeek = [];

        $orderedDishesLastWeek = [];
        $orderedDishesPastWeek = [];

        $customers = [];
        $customersLastWeek = [];
        $customersPastWeek = [];

        foreach ($orders as $order) {
            foreach ($order->orderItems as $orderItem) {
                if ($orderItem->created_at >= Carbon::now()->subDays(1)) {
                    $totalPaymentLastWeek[] = ($orderItem->quantity * $orderItem->products->price) - (($orderItem->discount / 100) * $orderItem->quantity * $orderItem->products->price);
                    $orderedDishesLastWeek[] = $orderItem->quantity;
                }
                if ($orderItem->created_at < now()->subDays(1) && $orderItem->created_at > now()->subDays(2)) {
                    $totalPaymentPastWeek[] = ($orderItem->quantity * $orderItem->products->price) - (($orderItem->discount / 100) * $orderItem->quantity * $orderItem->products->price);
                    $orderedDishesPastWeek[] = $orderItem->quantity;
                }

                if ($order->created_at > Carbon::now()->subDays(1)) {
                    if (!in_array($order->users->user_id, $customersLastWeek, true)) {
                        $customersLastWeek[] = $order->users->user_id;
                    }
                }
                if ($order->created_at < now()->subDays(1) && $order->created_at > now()->subDays(2)) {
                    if (!in_array($order->users->user_id, $customersPastWeek, true)) {
                        $customersPastWeek[] = $order->users->user_id;
                    }
                }

                $totalPayment[] = ($orderItem->quantity * $orderItem->products->price) - (($orderItem->discount / 100) * $orderItem->quantity * $orderItem->products->price);
                $orderedDishes[] = $orderItem->quantity;
                $customers[] = $order->users;
            }
        }

        $revenueLastWeek = array_sum($totalPaymentLastWeek);
        $revenuePastWeek = array_sum($totalPaymentPastWeek);

        if ($revenuePastWeek != 0) {
            $revenueStat = ($revenueLastWeek - $revenuePastWeek) / $revenuePastWeek * 100;
        } else {
            $revenueStat = $revenueLastWeek * 100;
        }

        $dishCountLastWeek = array_sum($orderedDishesLastWeek);
        $dishCountPastWeek = array_sum($orderedDishesPastWeek);

        if ($dishCountPastWeek != 0) {
            $dishStat = ($dishCountLastWeek - $dishCountPastWeek) / $dishCountPastWeek * 100;
        } else {
            $dishStat = $dishCountLastWeek * 100;
        }

        $orderedDishCount = array_sum($orderedDishes);
        $revenue = array_sum($totalPayment);

        $customersLastWeek = count($customersLastWeek);
        $customersPastWeek = count($customersPastWeek);

        if ($customersPastWeek != 0) {
            $customersStat = ($customersLastWeek - $customersPastWeek) / $customersPastWeek * 100;
        } else {
            $customersStat = $customersLastWeek * 100;
        }


        return [
            'revenue' => $revenue,
            'revenueStat' => $revenueStat,
            'dishStat' => $dishStat,
            'orderedDishCount' => $orderedDishCount,
            'customers' => $customers,
            'customersStat' => $customersStat
        ];

    }

    public function latestOrder()
    {
        return $this->model::select('id')->latest('created_at')->first();
    }

    public function tables()
    {
        return Table::select('no')->where('status', 1)->get();
    }

    public function createDiscount($request)
    {
        return Discount::create(
            [
                'name' => $request->name,
                'percentage' => $request->percentage,
                'validity' => 5,
                'published' => $request->validity,
            ]
        );
    }

    public function updateDiscount($request, $id)
    {
        return Discount::where('id', $id)->update(['published' => $request->status]);
    }

    public function deleteDiscount($id)
    {
        $discount = Discount::findOrFail($id);
//        $discount->products()->detach();
        return $discount->delete();
    }

}
