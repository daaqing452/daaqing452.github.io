jQuery.namespace("fp.printMod");
fp.printMod.procinst_id="";
fp.printMod.task_id="";
fp.printMod.status="";
fp.printMod.clickPrint = function(procinst_id,task_id,status){
	fp.printMod.procinst_id = procinst_id;
	fp.printMod.task_id = task_id;
	fp.printMod.status = status;
	Util.ajax({
			url : contextpath + "/fp/exportpdf/getPrintTemplate",
			async : false,
			param : {
				task_id : task_id,
				procinst_id : procinst_id,
				status : status
			},
			success : function(result) {
				    if (result.length < 1){
				        Msg.warning("没有对应模板！");
			        }else if (result.length == 1) {
			        	fp.printMod.doPrint(result[0]);
					} else {
						Msg.open({
								skin : 'fp-class',
								title : false,
								type : 1,
								closeBtn : 0,
								maxWidth : 910,
								content : $('#choosePrintMod'),
								success : function(layero, index) {
									Util.renderTemplet({
												data : result,
												templetId : "printModList",
												containerId : "printModList_container"
									});
									$("div[name='printModReport']").click(function() {
										window.open($(this).attr('url'));
									});
									$("div[name='printModLocal']").click(function() {
										var temp = {TEMPLATE_ID:$(this).attr('TEMPLATE_ID'),procinst_id:$(this).attr('procinst_id'),TEMPLATE_NAME:$(this).attr('TEMPLATE_NAME'),TEMPTYPE:$(this).attr('TEMPTYPE')}
										fp.printMod.doPrint(temp);
									});
									$("#fp_select_print_cancel").unbind("click").click(function() {
										layer.close(index);
									});
									$("#fp_select_print_close").unbind("click").click(function() {
										layer.close(index);
									});
								}
						});
					}
			}
	});
};
fp.printMod.doPrint = function(temp){
 	if(temp.TEMPTYPE == 2){
 			window.open(temp.URL);
 	}else if(temp.TEMPTYPE == 1){//导出pdf
 		window.location.href = contextpath + "/fp/exportpdf/getPdf?templateId="+temp.TEMPLATE_ID+"&procinst_id="+(temp.procinst_id?temp.procinst_id:"")+"&task_id="+fp.printMod.task_id+"&status="+(fp.printMod.status?fp.printMod.status:"");
 	}else if(temp.TEMPTYPE == 3){//导出word
 		if(/iphone|ipad|ipod/.test(window.navigator.userAgent.toLocaleLowerCase())){
 			Msg.warning("该功能不支持在苹果手机上操作！");
 			return;
 		}else{
 			window.location.href = contextpath + "/fp/exportpdf/getWord?templateId="+temp.TEMPLATE_ID+"&procinst_id="+(temp.procinst_id?temp.procinst_id:"")+"&task_id="+fp.printMod.task_id+"&status="+(fp.printMod.status?fp.printMod.status:"");
 		}
 	}
 	fp.printMod.writeLog();
 }
 fp.printMod.doPrintBatch = function(taskIds){
 	window.location.href = contextpath + "/fp/exportpdf/exportBatch?workitemIds="+taskIds;
 }
fp.printMod.writeLog = function(){
	Util.ajax({
		url : contextpath + "/fp/exportpdf/printLog",
		async : false,
		param : {
			workitem_id : fp.printMod.task_id,
			procinst_id : fp.printMod.procinst_id,
		},
		success : function(result) {
			
		}
	});
}
fp.printMod.doCommonPrint = function(formType,serviceName,procinst_id){
	if(Util.getClientInfo()!="PC"){
		Msg.warning("该功能仅支持在电脑端操作！");
		return;
	}
	var bodyHtml = "";
	if(formType=="url"){
		bodyHtml = $("#formIframe").contents().find("body").html();
	}else{
		bodyHtml = fp.printMod.parseForm();
	}
	var requestURL = contextpath + "/fp/exportpdf/getCommonPdf";
	var xhr = new XMLHttpRequest();
	xhr.open('POST',requestURL,true);
	xhr.responseType = "blob";
	xhr.setRequestHeader('Content-Type','application/json');
	xhr.onload = function(){
	if(loading) {Msg.close(loading);}
	if(this.status == 200) {
	var blob = this.response;
	if(this.getResponseHeader("status")=="fail"){
	Msg.warning("导出pdf失败，请联系管理员，错误信息是："+this.getResponseHeader("message"));
	return;
	}
	var url = URL.createObjectURL(blob);
	if(url.indexOf("http")==-1){
	window.navigator.msSaveOrOpenBlob(blob,serviceName+'.pdf');
	}else{
	var alink = $("<a id = 'alink' href = '"+url+"' download  = '"+serviceName+".pdf'><p></p></a>")
	$('body').append(alink);
	$("#alink").children().click();
	$("#alink").remove();
	}
	}else if(this.status == 500){
	Msg.warning("系统IO错误，导出pdf失败，请联系管理员！");
	}
	}
	var params = {
	"bodyHtml":bodyHtml,
	"procinst_id":procinst_id,
	}
	var loading = "" ;
	loading = Msg.load();//发送请求之前显示loading
	xhr.send(JSON.stringify(params));
}
fp.printMod.parseForm = function(){
	var bodyPrint = $("<div></div>").append($("#formIframe").contents().find(".if-necessary-use-this").clone());
	bodyPrint.find("[dojotype='unieap.form.TextBox'],[dojotype='unieap.form.DateTextBox'],[dojotype='unieap.form.Textarea']").each(function(i,o){
	 $(this).after($("#formIframe").contents().find("#"+$(this).attr("id")).val());
	})
    bodyPrint.find("[dojotype='unieap.form.dateGroup']").each(function(i,o){
      var $dateGroup = $("#formIframe").contents().find("#"+$(this).attr("id"));
      $(this).after($dateGroup.find("input[name='start_time']").val()+"至"+$dateGroup.find("input[name='end_time']").val());
    })
	bodyPrint.find("[dojotype='unieap.form.RichText']").next().each(function(i,o){
		var RichTextHtml = $(o).find(".panel-body").html();
		$(o).after(RichTextHtml);
	})
	bodyPrint.find("[dojotype='unieap.form.ComboBox']").each(function(i,o){
	  var val = $("#formIframe").contents().find("#"+$(o).attr("id")).val();
	  if(Array.isArray(val)){
	    var arrayText = new Array();
	    $(val).each(function(j,k){
	    	if(k!=""&&k!=undefined){
	  	      arrayText.push($(o).find("[value='"+k+"']").text());
	    	}
	    })
	    if(arrayText.length>0){
		    $(o).after(arrayText.join("，"));
	    }
	  }else{
		  if(val!=""&&val!=undefined){
			    $(o).after($(o).find("[value='"+val+"']").text());
		  }
	  }
	})
	bodyPrint.find("[dojotype='unieap.form.GroupBox']").each(function(i,o){
	  var checkedTextArr = new Array();
	  $(o).find(".van-checkbox__icon--checked,.van-radio__icon--checked").next().each(function(j,k){
		   checkedTextArr.push($(k).text());
	  })
	  if(checkedTextArr.length==0){
		  $(o).after("无");
	  }else{
		  checkedText = checkedTextArr.join("，");
		  $(o).after(checkedText);
	  }
	})
	bodyPrint.find("[dojotype='unieap.uploader.uploader']").each(function(i,o){
		var $fileNamediv=$("<div></div>");
		var domain = javascript_path.substring(0,javascript_path.indexOf(contextpath));
		if($(o).attr("uploadertype")=="picture"){
			$(o).find("img[imgviewer='imgViewer']").each(function(j,k){
			    var fileName =$(k).attr("alt");
				$fileNamediv.append("<div><a href='"+javascript_path+"/formParser?status=fileUpload&action=filedownload&fileName="+encodeURIComponent(fileName)+"&filePath="+$(k).attr("src")+"'>"+fileName+"</a></div>")
			})
		}else{
			$(o).find("span").each(function(j,k){
				if($(k).attr("file_new_name")){
				    $fileNamediv.append("<div><a href='"+domain+$(k).find(".text-primary").attr("href")+"'>"+$(k).find(".text-primary").text()+"</a></div>")
				}
			})
		}
		$(o).after($fileNamediv)
	})
	bodyPrint.find(".swiper-btngroup,.fixed-col-datatable-box,.bootstrap-select,[dojotype='unieap.form.GroupBox'],input[type='file'],[dojotype='unieap.uploader.uploader'],[sign='operate'],[dojotype='unieap.form.TextBox'],[dojotype='unieap.form.DateTextBox'],[dojotype='unieap.form.Textarea'],[dojotype='unieap.form.ComboBox'],script,[dojotype='unieap.grid.Grid'],[dojotype='unieap.form.dateGroup']").remove();
	bodyPrint.find("[name='datatable-check-all']").parent().remove();
	bodyPrint.find("[name='datatable-check']").parent().parent().remove();
	bodyPrint.find("[dojotype='unieap.form.RichText']").next().remove();
	bodyPrint.find(".amost-datatable").each(function(i,o){
		var thtr =  $("<tr></tr>");
		var linenum = 0;
		$(o).find("th").each(function(j,k){
			if($(k).css("display")!="none"){
				thtr.append("<td>"+$(k).text()+"</td>");
				linenum++;
			}
		})
		$(o).find("tbody").prepend(thtr);
		var rownum = $(o).find("tbody tr").length - 2;
		if(rownum<3){
			for(var i=0;i<3-rownum;i++){
				var extendtr = $("<tr></tr>");
				extendtr.append("<td>"+(rownum+i+1)+"</td>");
				for(var j=0;j<linenum-1;j++){
					extendtr.append("<td></td>");
				}
				$(o).find("tbody").append(extendtr);
			}
		}
		$(o).find("thead").remove();
	})
	var datatableBox = bodyPrint.find(".amost-datatable-box");
	datatableBox.prop("style","margin-top: 0pt;margin-bottom: 0px;");
	datatableBox.parent().parent().prop("style","padding : 0px;position: absolute;top:0;");
	datatableBox.parent().parent().parent().each(function(i,o){
		$(this).find("tr[name='empty_tr']").remove();
		var num = $(this).find("tr").length;
		$(this).prop("style","padding: 0px;position: relative;height:"+num*28+"px");
	})
	//处理重复节
	bodyPrint.find("[dojotype='unieap.repeating.repeator']").each(function(p,q){
           var id = $(q).attr("id");
           var repeator = $("#formIframe")[0].contentWindow.$("#"+id).data("FormWidget");
           var rowSet = repeator.dataStore.getRowSet();
           var rows = rowSet.getData(3);//取得primary所有数据
           var $printRepeator = $("<div></div>");
           $printRepeator.append('<div class="row layout-row" data-cols="1" ischild="true"><div class="layout-column col-xs-12 bg-theme-05 fz-16 text-bold " contenteditable="false" ischild="true" style="text-align: center;">'+repeator.title+'</div></div>');
           $(rows).each(function(i,o){
                $printRepeator.append('<div class="row layout-row" data-cols="1" ischild="true"><div class="layout-column col-xs-12 bg-theme-05 fz-16 text-bold " contenteditable="false" ischild="true" style="text-align: center;">'+repeator.subtitle+(i+1)+'</div></div>');
                var $node = $("<div></div>");
                $node.append(repeator.node_html);
                $("[repeatwidget='repeatWidget']",$node).each(function(j,k){
                     var $widget = $(k);
                     var key = $widget.attr("column");
                     var value = "";
                     switch($widget.attr("repeatortype")){
                         case "combobox":
                             value = o[key+'_TEXT'];
                             break;
                         case "date":
                             var format = $widget.attr("datetimeformat");
                             var date;
                             value = o[key];
                             if(value && $.isNumeric(value)){
                                // 需要修复的时间
                                var nowDate = parseInt(value);
                                // 服务器端时区，北京东八区（-8*60）
                                var timezone = -480;
                                // 客户端实际时区(例如东京为东九区：-540)
                                var offsetGMT = new Date(nowDate).getTimezoneOffset();
                                // 计算差值
                                var adjust = timezone - offsetGMT;
                                nowDate = nowDate - adjust * 60 * 1000;
                                date=new Date(nowDate);
                             }
                             value = $("#formIframe")[0].contentWindow.Util.dateFormatter(date,format);
                             break;
                         case "dategroup":
                             if(o[key]){
                               value = o[key].replace(";","至");
                             }
                             break;
                         default:
                             value = o[key];
                     }
                     $widget.after(value);
                })
                $printRepeator.append($node.html());
           })
           $printRepeator.find("[repeatwidget='repeatWidget']").remove();
           $(q).after($printRepeator.html());
	})
	bodyPrint.find("[dojotype='unieap.repeating.repeator']").remove();
	return bodyPrint.html();
}