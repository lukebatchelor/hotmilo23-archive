<?php
 echo '<link rel="stylesheet" type="text/css" href="myStyle.css">'; 
 echo '<center><h1>4 Pics 1 Word</h1><br><table class="button" style="width:75%"><tr><td><center>';
 $newWord=strtolower($_POST['newWord']);
 $length=strlen($newWord);
 $letter=substr($newWord,0,1);
 if(!is_dir($length))
 {
   mkdir($length, 0700);
 }
 if(!file_exists($length."/".$letter.".txt"))
 {
   $create = @fopen($length."/".$letter.".txt", 'w') ;
   fclose($create);
 } 
 $handle = @fopen($length."/".$letter.".txt", "r");
 if ($handle) 
 {
    $match=false;
    while (($buffer = fgets($handle, 4096)) !== false) 
    {
      if(strcmp(str_replace(PHP_EOL, '', $buffer), $newWord) == 0)
        $match=true;
    }
    fclose($handle);
    if(!$match)
    {
      $fh = @fopen($length."/".$letter.".txt", 'a');
      fwrite($fh, strtolower($newWord));
      echo "Thank you, that word has now been added to our list";
      fclose($fh);
      $fh = @fopen("addedWords.txt", 'a');
      fwrite($fh, strtolower($newWord));
      fclose($fh);
    }
    else
    {
      echo "We actually already have that word.<br> Are you sure you entered your letters correctly?";
    }
    echo "</td></tr></table><br>";
     echo '<a href=index.htm><input type="submit" value="Go Back" class="button" style="width:150px;"></a>';
 }
 
?>