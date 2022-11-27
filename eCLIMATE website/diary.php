<?php

$link = mysqli_connect("localhost","root","","sani");

+
if ($link===false){ 
    die("ERROR: Could not connect.".mysqli_connect_error());
}

if(isset($_POST['btn2']))
{

$firstname = $_POST['record'];
$lastname = $_POST['record'];
$password = $_POST['record'];

$sql = "INSERT INTO sani1( firstname,lastname,password) VALUES('$firstname','$lastname', '$password')";
if(mysqli_query($link, $sql)) {
    echo "You are successful registerred";
}
else{
    echo "error: ". $sql ."
    ". mysqli_error($link);
}



mysqli_close($link);
}



?>