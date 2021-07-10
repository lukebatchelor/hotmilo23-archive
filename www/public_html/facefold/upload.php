<?php
	header('Access-Control-Allow-Origin: *');
	if(isset($_FILES['img'])) {

		$allowed_filetypes = array('.jpg','.jpeg','.png', '.PNG', '.gif');
		$max_filesize = 10485760;
		$upload_path = 'uploads/';

		$filename = $_FILES['img']['name'];
		$ext = substr($filename, strrpos($filename,'.'), strlen($filename)-1);
		$newName = random_string(9).$ext;
		if(!in_array($ext,$allowed_filetypes)){
		  echo json_encode(array('error'=>'The file you attempted to upload is not allowed.'));
		}

		if(filesize($_FILES['img']['tmp_name']) > $max_filesize){
		  echo json_encode(array('error'=>'The file you attempted to upload is too large.'));
		}

		if(!is_writable($upload_path)){
		  echo json_encode(array('error'=>'You cannot upload to the specified directory, please CHMOD it to 777.'));
		}

		if(move_uploaded_file($_FILES['img']['tmp_name'],$upload_path . $newName)) { 
			echo json_encode(array('success'=>$upload_path.$newName));
		} 
		else {
			 echo json_encode(array('error'=>'There was an error during the file upload.  Please try again.'));
		}
	}
	else{
		echo json_encode(array('error'=>'File not sent.', 'POST'=>$_FILES));
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