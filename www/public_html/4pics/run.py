import os
chars=1;
while chars != 0:
        chars=int(input("characters?: "))
        letters=list(input("Letters?: "))

        for letter in letters:
                if(os.path.exists(str(chars)+"\\"+letter+".txt")):
                        with open(str(chars)+"\\"+letter+".txt") as infile:
                                for line in infile:
                                        line=line.rstrip('\r\n ')
                                        if(all(letters.count(e) >= line.count(e) for e in set(line))):
                                                print("Found "+line)
input("Press Enter...")
