<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="#" />
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="{{asset('js/flowbite.js')}}"></script>
    <title>POS</title>
</head>
<body>
<div id="app">
</div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
