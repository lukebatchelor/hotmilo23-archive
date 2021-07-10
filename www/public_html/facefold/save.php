<?php
	if(isset($_POST['imageData']))
	{
		$imageData = $_POST['imageData'];
		$imageData = str_replace('data:image/png;base64,', '', $imageData);
		do
		{
			$imageName = random_string(9).".PNG";
		} while (file_exists("share/".$imageName));
		
		file_put_contents("share/".$imageName, base64_decode($imageData));
		echo "share/".$imageName;
	}
	else
	{	
		echo "no";
		//header("location: http://www.hotmilo23.com/nope.htm");
	}
	function random_string($length) {
		$key = '';
		$keys = array_merge(range(0, 9), range('a', 'z'));

		for ($i = 0; $i < $length; $i++) {
			$key .= $keys[array_rand($keys)];
		}

		return $key;
	}
?>