<?php

$URL = $_POST["URL"]; 
$startTime = intval($_POST["Start"]);
$stopTime = intval($_POST["End"]);

$duration = $stopTime - $startTime;

//echo "<p>Link: $URL Start: $startTime End: $stopTime</p>"

//echo"<h1>Executing ffmpeg</h1>";
$output = shell_exec("ffmpeg -ss $startTime -t $duration -i $URL testoutput.avi");
echo "testoutput.avi";

?>