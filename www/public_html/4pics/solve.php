<?php
 echo '<link rel="stylesheet" type="text/css" href="myStyle.css">'; 
 echo "<center><h1>4 Pics 1 Word</h1>";
 echo '<table border=1 width=75% class="button" style="width:75%"><tr><td><center>'; 
 $_POST['letter']=strtolower($_POST['letter']);
 $lettersList=str_split( $_POST['letter'], 1 );
 $lettersList = array_unique($lettersList);
 $letterCounts=count_chars($_POST['letter'], 1);
 $lineCount=0;
 if(is_dir($_POST['length']))
 {
   foreach ($lettersList as $letter)
   {
     if(file_exists($_POST['length']."/".$letter.".txt"))
     {
       $handle = @fopen($_POST['length']."/".$letter.".txt", "r");
       if ($handle) 
       {
         while (($buffer = fgets($handle, 4096)) !== false) 
         {
           $match=true;
           $buffer = str_replace(PHP_EOL, '', $buffer);
           $tmpCount=count_chars($buffer,1);
           foreach($tmpCount as $l => $count)
           {
             if(($letterCounts[$l]>=$count) != 1)
             {
               $match=false;
               break;
             }
           }
           if($match)
           {
            $lineCount=$lineCount+1;
            if($lineCount%15 == 0)
              echo "</td><td valign=\"top\"><center>";
            echo $buffer."<br>";
           }
         }
         fclose($handle);       
       }//end if handle exists
     } //end if file exists
   }//end for each
 }//end if dir exists
 if($lineCount == 0)
           echo "Sorry, we were unable to find a match. <br>Make sure you entered the letters correctly and try again. <br>Otherwise click 'Not Solved' to add the word to our database";
 echo "</td></tr></table><br>";
 echo '<a href=index.htm><input type="submit" value="Solved" class="button" style="width:150px;"></a><a href=addWord.htm><input type="submit" value="Not Solved" class="button" style="width:150px;"></a>'

?>