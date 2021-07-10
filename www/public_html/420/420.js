var timer;
		var zones;
		//object to store timezones in
		function myDate(dateString)
		{
			this.accr = dateString.substr(0, dateString.indexOf(" "));
			this.name = dateString.substr(dateString.indexOf(" "), dateString.lastIndexOf(" ") - dateString.indexOf(" "));
			this.plusMinus = dateString.lastIndexOf("UTC+") != -1 ? 1 : -1;
			this.hours = parseInt(dateString.substr(dateString.lastIndexOf("UTC")+4, 2));
			this.minutes = dateString.lastIndexOf("UTC")+6 == dateString.lastIndexOf(":") ? 
				parseInt(dateString.substr(dateString.lastIndexOf("UTC")+7, 2)) :
				0;
			if(isNaN(this.hours))
				this.hours = 0;
			if(isNaN(this.minutes))
				this.minutes = 0;	
			this.tzOffset = this.plusMinus*this.hours*60+this.plusMinus*this.minutes
		}

		$( document ).ready(function() {
			zones = new Array();
			for(var i = 0; i < zoneStrings.length; i++)//zonesStrings defined in zoneStrings.js
			{
				zones.push(new myDate(zoneStrings[i]));
			}
			timer = setInterval(updateTime, 1000*20);//update the time every 20 seconds
			updateTime();
		});
		function updateTime()
		{
			shuffle(zones);
			var timeZoneOffset = new Date().getTimezoneOffset(); //timezoneoffset from UTC in minutes
			var now = new Date().getTime();
			//var now = new Date(48*60*60*1000).getTime() ; //used for testing only
			var nowUTC = new Date;
			var fakeHour = 13;		//for testing only
			var fakeMinute = 40;
			//nowUTC.setTime(now + timeZoneOffset*60*1000 + fakeHour*60*60*1000 + fakeMinute*60*1000);
			//find the current UTC time
			nowUTC.setTime(now + timeZoneOffset*60*1000 );
			var minutesUTC = nowUTC.getMinutes();
			var hoursUTC = nowUTC.getHours();

			var bestOffset = 9999;
			var idx = 0;
			var tempDate = new Date;
			for(var i=0; i < zones.length; i++)
			{
					tempDate.setTime(nowUTC.getTime() + zones[i].tzOffset*60*1000);
					if(minutesTo420(tempDate) < bestOffset)
					{
						bestOffset = minutesTo420(tempDate);
						idx = i;
					}
			}
			tempDate.setTime(nowUTC.getTime() + zones[idx].tzOffset*60*1000);		
			var hoursToWait = parseInt(""+(bestOffset/60));
			var minutesToWait = bestOffset % 60;
			document.getElementById("timeToWait").innerHTML = hoursToWait +" hours and "+minutesToWait+" minutes away";
			var timeZoneString = "in "+zones[idx].name +"<br>(UTC";
			if(zones[idx].plusMinus == 1)
				timeZoneString += "+";
			else	
				timeZoneString += "-";
			timeZoneString += makeTimeString(zones[idx].hours, zones[idx].minutes) +")";
			document.getElementById("timezone").innerHTML = timeZoneString;
		}
		function makeTimeString(hours, minutes)
		{
			var out="";
			if(hours < 10)
				out+="0"
			out+=""+hours+":";
			if(minutes < 10)
				out+="0"
			out+=""+minutes;
			
			return out;
		}
		function minutesTo420(time)
		{
			var hours = 16 - time.getHours();
			
			var minutes = 20 - time.getMinutes();
			if(minutes < 0)
			{
				minutes+=60;
				hours -= 1;
			}
			if(hours < 0)
				hours += 24;
			return hours*60+minutes;
		}
		//+ Jonas Raoni Soares Silva
		//@ http://jsfromhell.com/array/shuffle [v1.0]
		function shuffle(o){ //v1.0
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};