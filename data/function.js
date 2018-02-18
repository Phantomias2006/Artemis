    // ----------------------------------------------------------------------------------- 
	var byId = function( id ) { return document.getElementById( id ); };
	var byClass = function( id ) { return document.getElementsByClassName( id ); };
	var getIcon = function( icon ) { return '<span class="icon-'  + icon + '"></span>'; };
	byId('index').style.display = "inline";
	// -----------------------------------------------------------------------------------
	var help_thingspeak = '<p><span>Kopple deine WLANThermo Nano mit dem ThingSpeak-Dienst und erstelle dir individuelle Anwendungen zur Sensor-Datenanalyse. Ben&ouml;tigt Internetzugang.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/ThingSpeak"><span style="color:#3366ff">Wiki - ThingSpeak</span></a></p>';
	var help_wifi = '<p><span>Verbinde dein WLANThermo mit deinem Heimnetzwerk und erweitere somit die Funktionsvielfalt deines WLANThermo.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/WLAN"><span style="color:#3366ff">Wiki - WLAN</span></a></p>';
	var help_settings = '<p><span>Konfiguriere dein WLANThermo Nano mit Hilfe der Systemeinstellungen und mach es zu DEINEM WLANThermo.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/System-Einstellungen"><span style="color:#3366ff">Wiki - System</span></a></p>';
	var help_pitmaster = '<p><span>Willst du deine Grilltemperaturen nicht nur beobachten, sondern auch regeln? Dann besorge dir die passende Pitmaster-Hardware und leg los. Ben&ouml;tigt Pitmaster-Hardware.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/Pitmaster"><span style="color:#3366ff">Wiki - Pitmaster</span></a></p>';
	var help_notification = '<p><span>Lass dich bei einem Kanalalarm mit einer Push-Nachricht über den Nachrichtendienst Telegramm oder den Notification-Dienst Pushover benachrichtigen. Ben&ouml;tigt Internetzugang.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/Push-Notification"><span style="color:#3366ff">Wiki - Notification</span></a></p>';
	var help_mqtt = '<p><span>Kopple dein WLANThermo Nano mit deiner Homeautomatic und nutze dafür die MQTT-Schnittstelle deines WLANThermo. Ben&ouml;tigt einen MQTT-Broker.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/Private-MQTT"><span style="color:#3366ff">Wiki - Private-MQTT</span></a></p>';
	var help_cloud = '<p><span>Der Nano Cloud Service erm&ouml;glicht dir den gesch&uuml;tzten Zugriff auf deine Temperaturdaten auch au&szlig;erhalb deines Heim-Netzwerks. Ben&ouml;tigt Internetzugang. </span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/Nano-Cloud-Service"><span style="color:#3366ff">Wiki - Nano Cloud</span></a></p>';
	var help_channel = '<p><span>Mit Hilfe der Kanal-Einstellungen passt du den Messkanal an den angeschlossenen F&uuml;hler an. Zus&auml;tzlich kannst du Grenzwerte für die Alarmfunktion vorgeben.</span></p><p><span>Siehe auch: </span><a href="https://github.com/WLANThermo-nano/WLANThermo_nano_Software/wiki/Kanal-Einstellungen"><span style="color:#3366ff">Wiki - Kanal</span></a></p>';
	// -----------------------------------------------------------------------------------
	(function (window, document) {
		var layout = byId('layout'),menu = byId('menu'),menuLink = byId('menuLink'),menuHome = byId('menuHome'),menuPitmaster = byId('menuPitmaster'),menuNotification = byId('menuNotification'),menuWlan = byId('menuWlan'),menuSystem = byId('menuSystem'),menuThingspeak = byId('menuThingspeak'),menuAbout = byId('menuAbout'),content  = byId('main');
		function toggleClass(element, className) {
			var classes = element.className.split(/\s+/), length = classes.length, i = 0;
			for(; i < length; i++) {
			  if (classes[i] === className) {
				classes.splice(i, 1);
				break;
			  }
			}
			// The className is not found
			if (length === classes.length) {
				classes.push(className);
			}
			element.className = classes.join(' ');
		}

		function toggleAll(e) {
			var active = 'active';
			e.preventDefault();
			toggleClass(layout, active);
			toggleClass(menu, active);
			toggleClass(menuLink, active);
		}

		menuLink.onclick = function (e) {toggleAll(e);};
		menuHome.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showIndex();}};
		menuWlan.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showWLAN();}};
		menuThingspeak.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showThingspeak();}};
		menuPitmaster.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showPitmaster();}};
		menuNotification.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showPushNotification();}};
		menuSystem.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showSystem();}};
		menuAbout.onclick = function (e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);showAbout();}};
		content.onclick = function(e) {if (menu.className.indexOf('active') !== -1) {toggleAll(e);}};
	}(this, this.document));

	document.addEventListener("DOMContentLoaded", function(event) { 
		setThermoName();
		setInterval("readTemp();", 2000);
	});
	
	function showWLAN(){
		hideAll();
		byId('wlan_config').style.display = "inline";
		networklist();
		networkscan();
	}
	
	function wlan_active(){
		if(byId('wlan_active').checked){
	
		}else{
			txt = 'Soll die Wifi-Verbindung bis zum nächsten Restart des Systems wirklich abgeschaltet werden?';
			if (confirm(txt) == true) {
				loadJSON('stopwifi', '', '60000', function (response) {
                  if(response == 'true'){      
                    self.location.href='about:blank'
                  }
                });
			} else {
				byId('wlan_active').checked = true;
			}
		}
	}
	
	function clearWifi(){
		txt = 'Sollen wirklich alle Netzwerkverbindungsdaten gelöscht werden?\nNano startet danach im AP-Modus neu.';
		if (confirm(txt) == true) {
			loadJSON('clearwifi', '', '60000', function (response) {
                if(response == 'true'){      
                   self.location.href='about:blank'
                }
			});
        }
	}
	
	function showThingspeak(){
		hideAll();
		showLoader('true');
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			byId('TSon').checked = jr.iot.TSon;
			byId('TSwrite').value = jr.iot.TSwrite;
			byId('TShttp').value = jr.iot.TShttp;
			byId('TSchID').value = jr.iot.TSchID;
			byId('TSinterval').value = jr.iot.TSint;
			byId('TSshow8').checked = jr.iot.TSshow8;
			byId('PMQon').checked = jr.iot.PMQon;
			byId('PMQhost').value = jr.iot.PMQhost;
			byId('PMQport').value = jr.iot.PMQport;
			byId('PMQuser').value = jr.iot.PMQuser;
			byId('PMQpass').value = jr.iot.PMQpass;
			byId('PMQqos').value = jr.iot.PMQqos;
			byId('PMQinterval').value = jr.iot.PMQint;
			byId('CLon').checked = jr.iot.CLon;
			byId('CLinterval').value = jr.iot.CLint;
			byId('CLtoken').innerHTML = "https://cloud.wlanthermo.de/index.html?api_token=" + jr.iot.CLtoken;			
			byId("CLtoken").setAttribute("href", "https://cloud.wlanthermo.de/index.html?api_token=" + jr.iot.CLtoken);
			byId('thingspeak').style.display = "inline";
			byId('thingsheader').style.display = "inline";
			byId('mqttheader').style.display = "inline";
			showLoader('false');
		})	
	}	

	function newToken(){
		showLoader('true');
		loadJSON('newtoken', '', '3000', function (response){
		byId('CLtoken').innerHTML = "https://cloud.wlanthermo.de/index.html?api_token=" + response;			
		byId("CLtoken").setAttribute("href", "https://cloud.wlanthermo.de/index.html?api_token=" + response);
			showLoader('false');
		})
	}
	
	function setThingspeak(){
		showLoader('true');
		loadJSON('settings', '', '3000', function (response){
			jr = JSON.parse(response);
			jr.iot.TSon = byId('TSon').checked;
			jr.iot.TSwrite = byId('TSwrite').value;
			jr.iot.TShttp = byId('TShttp').value;
			jr.iot.TSchID = byId('TSchID').value;
			jr.iot.TSint = byId('TSinterval').value;
			jr.iot.TSshow8 = byId('TSshow8').checked;
			jr.iot.PMQon = byId('PMQon').checked;
			jr.iot.PMQhost = byId('PMQhost').value;
			jr.iot.PMQport = byId('PMQport').value;
			jr.iot.PMQuser = byId('PMQuser').value;
			jr.iot.PMQpass = byId('PMQpass').value;
			jr.iot.PMQqos = byId('PMQqos').value;
			jr.iot.PMQint = byId('PMQinterval').value;
			jr.iot.CLon = byId('CLon').checked;
			jr.iot.CLtoken = byId('CLtoken').value;
			jr.iot.CLint = byId('CLinterval').value;
			var data = JSON.stringify(jr.iot);
			showLoader('true');
			loadJSON('setIoT', data, '60000', function (response) {
				showIndex();
				showLoader('false');
			})		
		})
	}
	
	function showPushNotification(){
		hideAll();
		showLoader('true');
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			byId('TGon').checked = jr.iot.TGon;
			byId('TGtoken').value = jr.iot.TGtoken;
			byId('TGid').value = jr.iot.TGid;
			byId('push_notification').style.display = "inline";
			showLoader('false');
		})				
	}

	function getChatID(){
		getRequest();
	}
	
	function setPushNotification(){
		showLoader('true');
		loadJSON('settings', '', '3000', function (response){
			jr = JSON.parse(response);
			jr.iot.TGon = byId('TGon').checked;
			jr.iot.TGtoken = byId('TGtoken').value;
			jr.iot.TGid = byId('TGid').value;
			var data = JSON.stringify(jr.iot);
			showLoader('true');
			loadJSON('setIoT', data, '60000', function (response) {
				showIndex();
				showLoader('false');
			})		
		})
	}

	function sendPushNotification(){
		data = '?token=' + byId('TGtoken').value + '&id=' + byId('TGid').value;
		loadJSON('message' + data, '', '60000', function (response) {
			//alert(data);
		})	
	}
	
	function showSetWLAN(){
		hideAll();
		byId('wlan_set').style.display = "inline";
	}	

	function showSetChannel(channel){
        hideAll();
        showLoader('true');
        loadJSON('settings', '', '3000', function (response) {
            jr = JSON.parse(response);
            clearOption('sensor');
            for (var i = 0; i < jr.sensors.length; i++) {
                byId('sensor').options[byId('sensor').options.length] = new Option(jr.sensors[i], i);
            }
            loadJSON('data', '', '3000', function (response) {
                jr = JSON.parse(response);
                byId('channel_settings_save').setAttribute('onclick','setChannel(' + channel + ');');
                byId('channel_settings_headtitle').innerHTML  = jr.channel[channel].name;
                byId('channel_name').value  = jr.channel[channel].name;
                byId('temp_max').value  = jr.channel[channel].max;
                byId('temp_min').value  = jr.channel[channel].min;
                byId('color').value = jr.channel[channel].color;
                byId('sensor').value = jr.channel[channel].typ;
                switch(jr.channel[channel].alarm) {
					case 0:
						byId('pushalarm').checked = false;
						byId('hwalarm').checked = false;
						break;
					case 1:
						byId('pushalarm').checked = true;
						byId('hwalarm').checked = false;
						break;
					case 2:
						byId('pushalarm').checked = false;
						byId('hwalarm').checked = true;
						break;
					case 3:
						byId('pushalarm').checked = true;
						byId('hwalarm').checked = true;
						break;
				} 				                
				byId('channel_settings').style.display = "inline";
                showLoader('false');
            })
        })
    }

	function setChannel(channel){
		showLoader('true');
		loadJSON('data', '', '3000', function (response) {
			jr = JSON.parse(response);
			jr.channel[channel].min = byId('temp_min').value;
			jr.channel[channel].max = byId('temp_max').value;
			jr.channel[channel].name = byId('channel_name').value;
			jr.channel[channel].typ = byId('sensor').value;
			var push = 0;
			if(byId('pushalarm').checked == false && byId('hwalarm').checked == false){
				push = 0;
			}else if(byId('pushalarm').checked == true && byId('hwalarm').checked == false){
				push = 1;
			}else if(byId('pushalarm').checked == false && byId('hwalarm').checked == true){
				push = 2;
			}else if(byId('pushalarm').checked == true && byId('hwalarm').checked == true){
				push = 3;
			}
			jr.channel[channel].alarm = push;
			jr.channel[channel].color = byId('color').value;
			var data = JSON.stringify(jr.channel[channel]);
			showLoader('true');
			loadJSON('setchannels', data, '60000', function (response) {
				showIndex();
				showLoader('false');
			})		
		})	
	}
	
	function clearOption(id){
		var selectbox = document.getElementById(id);
		var i;
		for(i = selectbox.options.length - 1 ; i >= 0 ; i--){
			selectbox.remove(i);
		}
	}
	
	function setWLAN(ssid, passwd){
		showLoader('true');
		var data='{"ssid":"' + ssid + '","password":"' + passwd + '"}';
		loadJSON('setnetwork', data, '60000', function (response) {
			showWLAN();
			showLoader('false');
		})
		
	}	
	
	function setThermoName(){
		showLoader('true');
		loadJSON('settings', '', '5000', function (response) {
			jr = JSON.parse(response);
			byId('thermoname').innerHTML = jr.system.host;
			if(jr.system.getupdate == 'false'){
				byClass("notification")[0].style.display = "none";
			}else{
				byClass("notification")[0].style.display = "inline";
			}
			showLoader('false');
		})
	}
	
	var updateActivated = 'false';
	
	function checkUpdateActivated(){
		loadJSON('updatestatus', '', '3000', function (response) {
			jr = JSON.parse(response);
			if (jr == true){
				showLoader('true');
			}else if (jr == false){
				showLoader('false')
				updateActivated = 'false';
				byClass("notification")[0].style.display = "none";
				location.reload(true);
			}
		})	
	}
	
	var dcActivated = 'false';
	
	function checkDCActivated(){
		loadJSON('dcstatus', '', '3000', function (response) {
			jr = JSON.parse(response);
			if (jr == true){
				showLoader('true');
			}else if (jr == false){
				showLoader('false')
				dcActivated = 'false';
			}
		})	
	}
	
	function showLoader(show){
		if (show == 'true') {
			byId('cover').classList.add("cover_active");
			byId('spinner').classList.add("spinner");		
		}else{
			byId('cover').classList.remove("cover_active");
			byId('spinner').classList.remove("spinner");
		}
	}
	
	function update(){
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			txt = 'Wollen Sie das aktuelle Update Installieren?\n\nAktuelle Version:' + jr.system.version + '\nNeue Version:' + jr.system.getupdate;
			if (confirm(txt) == true) {
				loadJSON('update', '', '60000', function (response) {
					showLoader('true');
					updateActivated = 'true';
				});
			}						
		})	
	}
	
	function showSystem(){
		hideAll();
		showLoader('true');
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			byId('language').value = jr.system.language;
			byId('hostname').value = jr.system.host;
			byId('apname').value = jr.system.ap;
			byId('thermoname').innerHTML = jr.system.host;
			byId('unit').value = jr.system.unit;
			byId('fastmode').checked = jr.system.fastmode;
			byId('searchUpdate').checked = jr.system.autoupd;
			clearOption('hwversion');
			for (var i = 0; i < jr.hardware.length; i++) {
				byId('hwversion').options[byId('hwversion').options.length] = new Option(jr.hardware[i], jr.hardware[i]);
			}
			byId('hwversion').value = jr.system.hwversion;
			byId('system_config').style.display = "inline";
			showLoader('false');
		})
	}
	
	function setSystem(){
		showLoader('true');
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			jr.system.host = byId('hostname').value.replace(/ /g, '_');
			jr.system.ap = byId('apname').value.replace(/ /g, '_');
			jr.system.hwversion = byId('hwversion').value;
			jr.system.language = byId('language').value;
			jr.system.unit = byId('unit').value;
			jr.system.fastmode = byId('fastmode').checked;		
			jr.system.autoupd = byId('searchUpdate').checked;			
			var data = JSON.stringify(jr.system);
			showLoader('true');
			loadJSON('setsystem', data, '60000', function (response) {
				byId('thermoname').innerHTML = jr.system.host;
				showIndex();
				showLoader('false');
			})		
		})	
	}
	
	function showPitmaster(){		
		hideAll();
		showLoader('true');
		loadJSON('data', '', '3000', function (response) {
			jr = JSON.parse(response);
			pitID = 0;	// Pitmaster1
			byId('pitmaster_typ').value = jr.pitmaster[pitID].typ;
			clearOption('pitmaster_channel');
			for (var i = 0; i < jr.channel.length; i++) {
				byId('pitmaster_channel').options[byId('pitmaster_channel').options.length] = new Option('#' + jr.channel[i].number + ' - ' + jr.channel[i].name, jr.channel[i].number);
			}
			byId('pitmaster_channel').value = jr.pitmaster[pitID].channel;
			byId('pitmaster_set').value = jr.pitmaster[pitID].set;
			byId('pitmaster_value').value = jr.pitmaster[pitID].value;
			byId('pitmaster_settings').style.display = "inline";
			showLoader('false');
			showPitmasterProfile(jr.pitmaster[pitID].pid);
			changePitmasterTyp();
		})
	}
	function changePitmasterTyp(){		
		switch(byId('pitmaster_typ').value) {
			case 'off':
				byId('pitmaster_value_show').style.display = "none";
				byId('pitmaster_channel_show').style.display = "none";
				byId('pitmaster_set_show').style.display = "none";
				byId('pitmaster_profile_show').style.display = "none";
				byId('pid_settings_show').style.display = "none";
				break;
			case 'manual':
				byId('pitmaster_value_show').style.display = "inline";	
				byId('pitmaster_channel_show').style.display = "none";
				byId('pitmaster_set_show').style.display = "none";
				byId('pitmaster_profile_show').style.display = "inline";
				byId('pid_settings_show').style.display = "none";

				break;
			case 'autotune':
				byId('pitmaster_profile_show').style.display = "inline";
				byId('pitmaster_value_show').style.display = "none";
				byId('pitmaster_channel_show').style.display = "inline";
				byId('pitmaster_set_show').style.display = "inline";
				byId('pid_settings_show').style.display = "none";				
				break;
			case 'auto':
				byId('pitmaster_profile_show').style.display = "inline";
				byId('pitmaster_value_show').style.display = "none";
				byId('pitmaster_channel_show').style.display = "inline";
				byId('pitmaster_set_show').style.display = "inline";			
				byId('pid_settings_show').style.display = "inline";
				break;
			default:
				byId('pitmaster_profile_show').style.display = "inline";
				byId('pitmaster_value_show').style.display = "inline";
				byId('pitmaster_channel_show').style.display = "inline";
				byId('pitmaster_set_show').style.display = "inline";
				byId('pid_settings_show').style.display = "inline";
		} 		
	}
	function setPitmaster(){
		showLoader('true');
		loadJSON('data', '', '3000', function (response) {
			jr = JSON.parse(response);
			pitID = 0;	// Pitmaster1
			jr.pitmaster[pitID].typ = byId('pitmaster_typ').value;
			jr.pitmaster[pitID].channel = byId('pitmaster_channel').value;
			jr.pitmaster[pitID].set = byId('pitmaster_set').value;
			jr.pitmaster[pitID].value = byId('pitmaster_value').value
			jr.pitmaster[pitID].pid = byId('pid_profile').value
			var data = JSON.stringify(jr.pitmaster);
			loadJSON('setpitmaster', data, '60000', function (response) {
				showIndex();
				showLoader('false');
			})	
		})
		showLoader('false');		
	}
	
	function showPitmasterProfile(profile){
		showLoader('true');
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			clearOption('pitmaster_profile_aktor');
			clearOption('pid_profile');
			for (var i = 0; i < jr.pid.length; i++) {
				byId('pid_profile').options[byId('pid_profile').options.length] = new Option(jr.pid[i].name, i);
			}
			byId('pid_profile').value = profile;	
			for (var i = 0; i < jr.aktor.length; i++) {
				byId('pitmaster_profile_aktor').options[byId('pitmaster_profile_aktor').options.length] = new Option(jr.aktor[i], i);
			}
			byId('pitmaster_profile_aktor').value = jr.pid[profile].aktor;
			byId('pid_name').value = jr.pid[profile].name;	
			byId('pid_Kp').value = jr.pid[profile].Kp;	
			byId('pid_Ki').value = jr.pid[profile].Ki;
			byId('pid_Kd').value = jr.pid[profile].Kd;
			byId('pid_Kp_a').value = jr.pid[profile].Kp_a;
			byId('pid_Ki_a').value = jr.pid[profile].Ki_a;
			byId('pid_Kd_a').value = jr.pid[profile].Kd_a;
			byId('pid_DCmin').value = jr.pid[profile].DCmmin;
			byId('pid_DCmax').value = jr.pid[profile].DCmmax;
			showLoader('false');
		})			
	}
	
	function togglePitmasterView(){
		if(byId('pitmaster_settings').style.display == "inline"){
			byId('pitmaster_settings').style.display = "none";
			byId('pitmaster_profile').style.display = "inline";		
		}else{
			showPitmasterProfile(byId('pid_profile').value);
			byId('pitmaster_settings').style.display = "inline";
			byId('pitmaster_profile').style.display = "none";	
		}
	}

	function backPidProfile(){
		togglePitmasterView();
	}
	
	function setPitmasterProfile(){
		loadJSON('settings', '', '3000', function (response) {
			jr = JSON.parse(response);
			profile = byId('pid_profile').value;
			jr.pid[profile].aktor = byId('pitmaster_profile_aktor').value;
			jr.pid[profile].name = byId('pid_name').value;
			jr.pid[profile].Kp = byId('pid_Kp').value;
			jr.pid[profile].Ki = byId('pid_Ki').value;
			jr.pid[profile].Kd = byId('pid_Kd').value;
			jr.pid[profile].Kp_a = byId('pid_Kp_a').value;
			jr.pid[profile].Ki_a = byId('pid_Ki_a').value;
			jr.pid[profile].Kd_a = byId('pid_Kd_a').value;
			jr.pid[profile].DCmmin = byId('pid_DCmin').value;
			jr.pid[profile].DCmmax = byId('pid_DCmax').value;
			var data = JSON.stringify(jr.pid);
			loadJSON('setpid', data, '60000', function (response) {
				togglePitmasterView();
			})	
		})
		showLoader('false');	
	}
	
	function setDC(dc){
		if(dc == '0'){
			var_val = byId('pid_DCmin').value;
		}else{
			var_val = byId('pid_DCmax').value;
		}
		txt = 'Soll der Pitmasterausgang für 10 Sekunden mit dem angegebenen Wert angesteuert werden?';
		if (confirm(txt) == true) {
			data = '?aktor=' + byId('pitmaster_profile_aktor').value + '&dc=' + dc + '&val=' + var_val*10;
			loadJSON('setDC' + data, '', '60000', function (response) {
				showLoader('true');
				dcActivated = 'true';
			})	
		}		
	}
	
	function getRequest(){
		data = "?host='http://nano.norma.uberspace.de'&url='/telegram.php?token=344407734:AAGEdm9gxoFDfuXKUL6HynxDopYrdIYkMPc'&method=GET";
		loadJSON('getRequest', data, '60000', function (response) {
			jr = JSON.parse(response);
			alert(jr);
		})
	}
	function showChart(){
		hideAll();
		byId('chart_config').style.display = "inline";
	}	
	
	function showIndex(){
		hideAll();
		byId('index').style.display = "inline";
	}
	
	function showAbout(){
		hideAll();
		byId('about').style.display = "inline";
	}	

	function hideAll(){
		hideIDs = ['index','wlan_config','system_config','system_config','about','wlan_set','thingspeak','push_notification','channel_settings','pitmaster_settings','pitmaster_profile','extended_settings'];
		for (var i = 0; i < hideIDs.length; i++) {
			byId(hideIDs[i]).style.display = "none";
		}
	}
	
    function loadJSON(url, data, timeout, callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('POST', url, true);
        xobj.setRequestHeader("Content-Type", "application/json");
		xobj.timeout = timeout;
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        }
		xobj.ontimeout = function (e) {
			if (updateActivated != 'true'){
				showLoader('false');
			}
		};
        xobj.send(data);
    }
	
	var showBatteryWlanIcon = true;
	
	function setshowBatteryWlanIcon(){
		showBatteryWlanIcon = false;
		readTemp();
		setTimeout(function(){
			showBatteryWlanIcon = true;
        }, 10000);
	}
	
	function getBatteryIcon(percent,charge){
		data = '';
		if (showBatteryWlanIcon == true){
			if(charge == true){
				data = '<span class="icon-power-cord"> </span>';
			}else{
				data = '';
			}
			if (percent >= '90'){
				data = data + getIcon('battery-100');
			}else if (percent >= '75'){
				data = data + getIcon('battery-75');
			}else if (percent >= '50'){
				data = data + getIcon('battery-50');
			}else if (percent >= '15'){
				data = data + getIcon('battery-25');
			}else if (percent >= '10'){
				data = data + getIcon('battery-0');
			}else{
				data = data + getIcon('battery-0 icon-blinker');
			}
			return data + '&nbsp;';
		}else{
			if(charge == true){
				data = getIcon('power-cord');
			}else{
				data = '';
			}
			data = data + percent + '%';
			return data + '&nbsp;';
		}
	}
	
	function getRSSIIcon(dbm){
		data = '';
		if (showBatteryWlanIcon == true){
			if(dbm >= '-80'){
				data = data + getIcon('Wlan100');
			}else if (dbm >= '-95'){
				data = data + getIcon('Wlan66');
			}else if (dbm >= '-105'){
				data = data + getIcon('Wlan33');
			}
			return data;	
		}else{
			data = dbm + 'dBm';
			return data;		
		}
	}

	function getWifiSecureIcon(data){
		var lock = getIcon('lock');
		var unlock = getIcon('unlock');
		switch(data) {
			case 2: //ENC_TYPE_TKIP - WPA / PSK
				return lock;
				break;
			case 4: //ENC_TYPE_CCMP - WPA2 / PSK
				return lock;
				break;
			case 5: //ENC_TYPE_WEP - WEP
				return lock;
				break;
			case 7: //ENC_TYPE_NONE - open network
				return unlock;
			break;
			case 8:	//ENC_TYPE_AUTO - WPA / WPA2 / PSK
				return lock;
				break;	
			default:
				return lock;
		} 
	}
	
	function readTemp(){
		if (updateActivated == 'true'){
				checkUpdateActivated();
		}else if (dcActivated == 'true') {
				checkDCActivated();
		}else{
			loadJSON('data', '', '3000', function (response) {
				jr = JSON.parse(response);
				BatteryIcon = getBatteryIcon(jr.system.soc,jr.system.charge);
				byClass("battery")[0].innerHTML = BatteryIcon;
				RSSIIcon = getRSSIIcon(jr.system.rssi);
				byClass("wifi")[0].innerHTML = RSSIIcon;
				var x = byClass("pure-u-1-1 pure-u-md-1-2 pure-u-xl-1-4 temp_index");
				var i;
				var pitID = 0;
				var ch_count = 0;
				for (i = 0; i < x.length; i++) {
					x[i].getElementsByClassName('1-box channel')[0].style.borderColor = jr.channel[i].color;
					x[i].getElementsByClassName('chtitle')[0].innerHTML = jr.channel[i].name;
					if(jr.pitmaster[pitID].typ == 'auto' || jr.pitmaster[pitID].typ == 'autotune'){
						if (jr.pitmaster[pitID].channel == jr.channel[i].number){
							var a = getIcon('uniF2C7') + jr.pitmaster[pitID].set + '°' + ' / ';
							var e = ' ' + jr.pitmaster[pitID].value + '%';
							if(jr.pitmaster[pitID].value == '0'){
								x[i].getElementsByClassName('chtitle')[0].innerHTML = a + getIcon('fan') + ' ' + jr.pitmaster[pitID].value + '%';
							}else if (jr.pitmaster[pitID].value <= '25'){
								x[i].getElementsByClassName('chtitle')[0].innerHTML = a + getIcon('fan icon-rotate-25') + e;
							}else if (jr.pitmaster[pitID].value <= '50'){
								x[i].getElementsByClassName('chtitle')[0].innerHTML = a + getIcon('fan icon-rotate-50') + e;
							}else if (jr.pitmaster[pitID].value <= '75'){
								x[i].getElementsByClassName('chtitle')[0].innerHTML = a + getIcon('fan icon-rotate-75') + e;
							}else if (jr.pitmaster[pitID].value <= '100'){
								x[i].getElementsByClassName('chtitle')[0].innerHTML = a + getIcon('fan icon-rotate-100') + e;
							}
						}else{
							x[i].getElementsByClassName('chtitle')[0].innerHTML = jr.channel[i].name;
						}
					}else{
						x[i].getElementsByClassName('chtitle')[0].innerHTML = jr.channel[i].name;
					}
					x[i].getElementsByClassName('chnumber')[0].innerHTML = "#" + jr.channel[i].number;
					x[i].getElementsByClassName('tempmin')[0].innerHTML = getIcon('temp_down') + jr.channel[i].min + "°";
					x[i].getElementsByClassName('tempmax')[0].innerHTML = getIcon('temp_up') + jr.channel[i].max + "°";
					if (jr.channel[i].temp == '999'){
						x[i].style.display = 'none';
						x[i].getElementsByClassName('temp')[0].innerHTML = 'OFF';
						x[i].getElementsByClassName('temp')[0].style.color = "#FFFFFF";		
						x[i].getElementsByClassName('temp')[0].style.fontWeight = 'normal';
					}else{
						ch_count++;
						x[i].style.display = 'inline';
						x[i].getElementsByClassName('temp')[0].innerHTML = jr.channel[i].temp.toFixed(1) + "°" + jr.system.unit;
						if (jr.channel[i].temp < jr.channel[i].min){
							x[i].getElementsByClassName('temp')[0].style.color = "#1874cd";
							x[i].getElementsByClassName('temp')[0].style.fontWeight = 'bold';
						}else if (jr.channel[i].temp > jr.channel[i].max){
							x[i].getElementsByClassName('temp')[0].style.color = "red";
							x[i].getElementsByClassName('temp')[0].style.fontWeight = 'bold';
						}else{
							x[i].getElementsByClassName('temp')[0].style.color = "#FFFFFF";
							x[i].getElementsByClassName('temp')[0].style.fontWeight = 'normal';
						}
					}
				}
				if (ch_count == 0){
					for (i = 0; i < x.length; i++) {
						x[i].style.display = 'inline';
					}
				}
			})
		}
	}
	
	function networkscan(){
		loadJSON('networkscan', '', '3000', function (response) {
			byId('networkrefresh').innerHTML = '<h3><span class="icon-refresh icon-rotate-50" onclick="networkscan();"></span></h3>'
			if (response == "OK"){
				setTimeout("networklist();", 3000);
			}
		})
	}
	
	function networklist(){
		loadJSON('networklist', '', '3000', function (response) {
			jr = JSON.parse(response);
			byId('networklist').innerHTML = '';
			byId('networkconnect').innerHTML = '';
			var table_networklist = byId('networklist');
			var table_networkconnect = byId('networkconnect');
			if (jr.Connect){			
				byId('hr_wifi').style.display = "";
				var row = table_networkconnect.insertRow(0);
				addCell(row,getIcon('ok'),'row-Check','0');
				addCell(row,jr.SSID,'row-SSID','1');
				addCell(row,getRSSIIcon(jr.RSSI),'row-RSSI','2');
				addCell(row,getWifiSecureIcon(jr.Enc),'row-Enc','3');
				addCell(row,'','row-link','4');
			}else{
				byId('hr_wifi').style.display = "none";
			}
			NetworkconnectRowClick();
			for (var i = 0; i < jr.Scan.length; i++) {
				var row = table_networklist.insertRow(-1);
				addCell(row,'','row-Check','0');
				addCell(row,jr.Scan[i].SSID,'row-SSID','1');
				addCell(row,getRSSIIcon(jr.Scan[i].RSSI),'row-RSSI','2');
				addCell(row,getWifiSecureIcon(jr.Scan[i].Enc),'row-Enc','3');
				addCell(row,getIcon('circle-right'),'row-link','4');
			}
			byId('networkrefresh').innerHTML = '<h3><span class="icon-refresh" onclick="networkscan();"></span></h3>'
			NetworklistRowClick();
		})
	}
	function addCell(row,cellinnerHtml,cellClass,nr){
		var cell = row.insertCell(nr);
		cell.innerHTML = cellinnerHtml;
		cell.className = cellClass;
	}
	
	var ssidInput;
	function NetworklistRowClick() {
		var table = document.getElementById("networklist");
		var rows = table.rows; // or table.getElementsByTagName("tr");
		for (var i = 0; i < rows.length; i++) {
			rows[i].onclick = (function() { // closure
				var cnt = i; // save the counter to use in the function
				return function() {
					document.getElementsByName('ssidInput')[0].value = this.cells[1].innerHTML;
					document.getElementsByName('ssidPasswordInput')[0].value = null;
					ssidInput = this.cells[1].innerHTML;
					showSetWLAN();
				}    
			})(i);
		}
	}
	 
	function setssidInput(){
		document.getElementsByName('ssidInput')[0].value = ssidInput;
	}
	
	function NetworkconnectRowClick() {
		var table = byId('networkconnect');
		var rows = table.rows; // or table.getElementsByTagName("tr");
		for (var i = 0; i < rows.length; i++) {
			rows[i].onclick = (function() { // closure
				var cnt = i; // save the counter to use in the function
				return function() {
				}    
			})(i);
		}
	}
	
	function validateNumber(number,decimal) {
		val = number.value.replace(/[^0-9.,]/g,'').replace(/[,]/g, '.');
		switch(decimal) {
			case '1': 
				if(val){val = val.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];}
				break;
			case '2': 
				if(val){val = val.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];}
				break;
			case '3':
				if(val){val = val.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0];}
				break;
			case '4':
				if(val){val = val.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];}
				break;
			default:
				if(val){val = val.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0];}
		} 
		if(val.split('.').length>2){val = val.replace(/\.+$/,"");}		
		number.value = val;
	}
	
	function showExtendedSettings(){
		hideAll();
		byId('extended_settings').style.display = "inline";
	}
	
	var clickTimer = null;
	function touchStart() {
		if (clickTimer == null) {
			clickTimer = setTimeout(function () {
				clickTimer = null;
			}, 500)
		} else {
			clearTimeout(clickTimer);
			clickTimer = null;
			showExtendedSettings();
		}
	}	

	function restart(){
		txt = 'Nano neu starten?';
		if (confirm(txt) == true) {
			loadJSON('restart', '', '60000', function (response) {});
        }
	}

	function sethwversion(){
		txt = 'Wollen Sie die HW-Version auf v2 setzen?';
		if (confirm(txt) == true) {
			loadJSON('v2', '', '60000', function (response) {});
        }
	}
	
	function setHelpBox(title,v){	
		byId('helpBoxTitle').innerHTML = title;
		document.getElementById("helpBoxObject").innerHTML = v;
		byId('helpBox').style.display= 'block';
	}
	readTemp();
	