gotoPage = function (fromPageName, toPageName){
    var v = dijit.byId(fromPageName);
    v.performTransition(toPageName, 1, "slide", null);
};

reset = function (){
	alert(localStorage.u + " clear!!");
	localStorage.u = "";
	localStorage.p = "";
	localStorage.uid = "";
	localStorage.eid = "";
	var u = dijit.byId('username');
	var p = dijit.byId('password');
	u.set('value', "");
	p.set('value', "");
};

checkUserStatus = function(){
	var xhrArgs = {
		url: ERP_URL + "/openerp/c/checkUserStatus",
		postData: { dbname: ERP_DB, uid: localStorage.uid, pwd: localStorage.p, eid: localStorage.eid },
		handleAs: "json",
		load: function(data) {
			var uiAttdState = dijit.byId('attdStatus');
			if('present' == data.status){
				uiAttdState.set('value','出席');
				alert("您目前的狀態為:" + "出席");
			}else{
				uiAttdState.set('value','缺席');
				alert("您目前的狀態為:" + "缺席");
			}
		},
		error: function(data) {
			alert('取得使用者狀態錯誤!!');
		}
	};
	
	var deferred = dojo.xhrPost(xhrArgs);
};

login = function(){
	var prog = dojox.mobile.ProgressIndicator.getInstance(); 
	dojo.body().appendChild(prog.domNode);
    prog.start();
	u = dijit.byId('username');
	p = dijit.byId('password');
	var xhrArgs = {
		url: ERP_URL + "/openerp/c/login",
		postData: { dbname: ERP_DB, username: u.get('value'), password: p.get('value') },
		handleAs: "json",
		load: function(data) {
			localStorage.u = u.get('value');
			localStorage.p = p.get('value');
			localStorage.uid = data.uid;
			localStorage.eid = data.eid;
			checkUserStatus();
			prog.stop();
			gotoPage('LoginPage', "MainPage");
		},
		error: function(data) {
			prog.stop();
			alert('登入失敗!!');
		}
	};
	
	var deferred = dojo.xhrPost(xhrArgs);
};

checkin = function() {
	var prog = dojox.mobile.ProgressIndicator.getInstance();
	dojo.body().appendChild(prog.domNode);
    prog.start();
	var xhrArgs = {
		url: ERP_URL + "/openerp/f/checkin",
		postData: { dbname: ERP_DB, username: localStorage.u, password: localStorage.p },
		handleAs: "json",
		load: function(data) {
			prog.stop();
			alert('簽入成功');
			var uiAttdState = dijit.byId('attdStatus');
			uiAttdState.set('value','出席');
		},
		error: function(data) {
			prog.stop();
			alert('簽入失敗!!');
		}
	};
	
	var deferred = dojo.xhrPost(xhrArgs);
};

checkout = function() {
	var prog = dojox.mobile.ProgressIndicator.getInstance();
	dojo.body().appendChild(prog.domNode);
    prog.start();
	var xhrArgs = {
		url: ERP_URL + "/openerp/f/checkout",
		postData: { dbname: ERP_DB, username: localStorage.u, password: localStorage.p },
		handleAs: "json",
		load: function(data) {
			prog.stop();
			alert('簽出成功');
			var uiAttdState = dijit.byId('attdStatus');
			uiAttdState.set('value','缺席');
		},
		error: function(data) {
			prog.stop();
			alert('簽出失敗!!');
		}
	};
	
	var deferred = dojo.xhrPost(xhrArgs);
};

getOpptunitity = function() {
	var prog = dojox.mobile.ProgressIndicator.getInstance();
	dojo.body().appendChild(prog.domNode);
    prog.start();
	var xhrArgs = {
		url: ERP_URL + "/openerp/f/getOpps",
		postData: { dbname: ERP_DB, username: localStorage.u, password: localStorage.p },
		handleAs: "text",
		load: function(data) {
			//alert(data);
			var list1 = dijit.byId("opptDataList");
        	var container = list1.containerNode;
            container.innerHTML = data;
            dojox.mobile.parser.parse(container);
            prog.stop();
        	gotoPage('MainPage','OppsListPage');
		},
		error: function(data) {
			prog.stop();
			alert('Server Error!!');
		}
	};
	
	var deferred = dojo.xhrPost(xhrArgs);
};


leadsSave = function(){
	var prog = dojox.mobile.ProgressIndicator.getInstance();
	dojo.body().appendChild(prog.domNode);
    prog.start();
	var subject = dijit.byId('leads_subject');
	var notes = dijit.byId('leads_notes');
	var xhrArgs = {
		url: ERP_URL + "/openerp/f/leadsSave",
		postData: { dbname: ERP_DB, username: localStorage.u, password: localStorage.p, subject: subject.get('value'), notes: notes.get('value') },
		handleAs: "text",
		load: function(data) {
			prog.stop();
			alert(data);
			subject.set('value', "");
			notes.set('value', "");
		},
		error: function(data) {
			prog.stop();
			alert('Server Error!!');
		}
	};
	
	var deferred = dojo.xhrPost(xhrArgs);
};


