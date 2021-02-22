jQuery.namespace("fp.serviceview");

fp.serviceview.isContainUploadFiles="0";

Util.run = function() {
	var hash = window.location.hash;
	fp.serviceview.procinst_id = Util.getHash(hash, "procinst_id", "");
	fp.serviceview.service_id = Util.getHash(hash, "service_id", "")!=""?Util.getHash(hash, "service_id", ""):Util.getHash(hash, "temp_id", "");
	fp.serviceview.app_type = "";
	fp.serviceview.service_name = "";
	var data = {};
	Util.ajax({
		url : contextpath + "/fp/taskcenter/itemName" ,//后台的请求路径
		dataType : 'text',
		async:false,
		param : {
			procinst_id : fp.serviceview.procinst_id
		},
		success: function(result){
			data['procinst_id'] = fp.serviceview.procinst_id ;
			data['name'] = result;
			fp.serviceview.service_name = result;
			Util.renderTemplet({templetId:"serviceview_list_page",containerId:"divServiceview",data:data});
			$("#processIframe").load(function(){
			    $("#loadingProc").hide()
				$("#processIframe").show();
			});
			Util.ajax({
				url : contextpath + "/fp/taskcenter/getProcType" ,//后台的请求路径
				param : {
					service_id:fp.serviceview.service_id,
					procInst_id : fp.serviceview.procinst_id
				},success: function(result){
					fp.serviceview.app_name = result.app_name;
					fp.serviceview.app_url = result.app_url;
					fp.serviceview.app_type = result.app_type;
					fp.serviceview.isContainUploadFiles=result.isContainUploadFiles;
					fp.serviceview.renderForm();
					fp.serviceview.queryDataList();
					fp.serviceview.initEvent();
					fp.serviceview.toggleOpenClose();
				}
			});
		}
	});
	
	/*点击tab页审核详情时，刷新该页面表格列宽*/
	$('a[href="#tabProcess"]').on('shown.bs.tab', function (e) {
		$.fn.dataTable.tables({ visible:true, api:true}).columns.adjust();
	});
	//if(fp.tempSourceUrl=="tabsecond"){
		//$("#export").show();
		var isNoPrint = fp.serviceview.print();
		if(isNoPrint == "1"){
			$("#print_template").show();
		}else if(isNoPrint == "2"){
			$("#print_template").attr("status","apply").show();
		}else if(isNoPrint.indexOf("3")==0){
			$("#export").text(isNoPrint.split(";")[1]).show();
			$("#export").parent().show();
		}else if(isNoPrint.indexOf("4")==0){
			$("#export").text(isNoPrint.split(";")[1]).show();
			$("#export").parent().show();
		}
	//}
};
/*收起展开页*/
fp.serviceview.toggleOpenClose = function(){
	 $(".arr-fold-box").on("click",function(){
		 if($(this).find("i").hasClass("fa-angle-up")){
			$(this).find("span").html(fp_zhan_kai);
			$(this).closest(".adp-foldable-con").css("height",45);
			$(this).find("i").removeClass("fa fa-angle-up").addClass("fa fa-angle-down");
         }else{
            $(this).find("span").html(fp_shou_qi);
			$(this).closest(".adp-foldable-con").css("height","auto");
			$(this).find("i").removeClass("fa fa-angle-down").addClass("fa fa-angle-up");
         }
	});	
}
fp.serviceview.print = function(){
	var print_template = "";
	Util.ajax({
		url:contextpath +"/fp/myserviceapply/getIsNoPrint",
		async:false,
		dataType : 'text',
		param:{
			   procinst_id:fp.serviceview.procinst_id
		},
		success:function(result){
			print_template = result;
		}
	});
	return print_template;
};
fp.serviceview.initEvent = function(){
	//导出按钮
	$("#export").click(function(){
//		var webForm = $("#formIframe")[0].contentWindow.WebForm;
//		if(webForm){
//			webForm.exportForm();
//		}
		fp.printMod.doCommonPrint(fp.serviceview.app_type,fp.serviceview.service_name,fp.serviceview.procinst_id);
	});
	//打印模板功能
	$("#print_template").click(function(){
		if($(this).attr("status")=="apply"){
			fp.printMod.clickPrint(fp.serviceview.procinst_id,"","apply");
		}else{
			Util.ajax({
				url:contextpath +"/fp/taskcenter/getPrintTemplateById",
				dataType:"text",
				async:false,
				param:{
					procinst_id:fp.serviceview.procinst_id
				},
				success:function(result){
					if(result){
						window.open(result);
					}else{
						Msg.warning("没有对应模板！");
					}
					
				}
			});
		}
	});
};
//查询表单
fp.serviceview.renderForm = function(){
	var type,procIds,names,formIds,serviceidstr,formId,serveId;
	serveId = fp.serviceview.service_id;
	Util.ajax({
		url:contextpath +"/fp/serveapply/getServeApply",
		async : false,
		param:{
			'serveID':serveId ,
			'from' :"hall"
		},
		success:function(data){
			type = data.type;
			formId = data.formID;
			serviceidstr = data.serviceidstr;
			formIds = data.formIds;
			names = data.names;
			procIds = data.procIds;
		}
	});
	if(fp.serviceview.app_type == "url" && fp.serviceview.app_url.indexOf("HtmlForm:")!=0){
		var visitUrl = "";
		if((fp.serviceview.app_url.indexOf("http://")+fp.serviceview.app_url.indexOf("https://"))>-2){
			visitUrl = fp.serviceview.app_url;
		}else{
			visitUrl = contextpath + "/outerform?m=fp#act=" + fp.serviceview.app_url + "&status=applied"//通过hash来判断表单select状态（applying申请中、applied已申请查看状态、approving待审批、approved已审批、cc待阅）
			+ "&SYS_FK=" + fp.serviceview.procinst_id;//若存在暂存，则再hash中传递FKID
		}
		$("#formIframe").load(function(){
		    $("#loadingForm").hide();
	    })
		$("#formIframe").attr("src",visitUrl);
	}else{
		var sacaform = true;//是否基软表单
		var htmlFormUrl = "";
		if(fp.serviceview.app_url.indexOf("HtmlForm:")==0){//去iframe的外部表单（支持手机端和电脑端双页面）
			var phoneUrl = "";
			var pcUrl = "";
			$(fp.serviceview.app_url.substring(9,fp.serviceview.app_url.length).split(";")).each(function(i,o){
				var type = o.split(",")[0];
				var url = o.split(",")[1];
				if(type=="pc"){
					pcUrl = url;
				}else if(type=="phone"){
					phoneUrl = url;
				}
			})
			if(window.innerWidth<1023&&phoneUrl!=""){//手机端
				sacaform = false;
				htmlFormUrl = phoneUrl;
			}else if(window.innerWidth>=1023&&pcUrl!=""){//pc端
				sacaform = false;
				htmlFormUrl = pcUrl;
			}
			if(!sacaform){
			   Util.replaceHash("status","applied");
			   Util.replaceHash("SYS_FK",fp.serviceview.procinst_id);
			   $("#formIframe").hide();
			   $("#formIframe").after("<div id='outerForm'></div>");
			   $("#outerForm").load(htmlFormUrl);
			   $("#loadingForm").hide();
			}
		}
		if(sacaform){
			$("#formIframe").load(function(){
				if($(this)[0].contentWindow.location.href.indexOf("formParser")<0){
					$("#loadingForm").hide();
				}
		   })
			Util.ajax({
				url:contextpath +"/fp/myserviceapply/getForm",
				dataType:'text',
				param:{
					procinst_id:fp.serviceview.procinst_id
				},
				success:function(data){
					$("#formIframe").attr("src",contextpath+data);
				}
			});
		}
		$("#formIframe").load(function(){
			var mh = $(this).contents().find("body").height()+10;
		    $(this).height(mh);
		});
		}
};

fp.serviceview.queryDataList = function(){
	Util.ajax({
		url : contextpath + "/fp/taskcenter/getPageHistoryList",
		param : {procinst_id:fp.serviceview.procinst_id},
		success:function(result){
			if(result!=null){
				for(var i=0;i<result.length;i++){
					result[i].approve_opinion = result[i].approve_opinion.replace(/[\n\r]/g,'<br />').replace(/'/g,'’');
				}
				result.isupload=fp.serviceview.isContainUploadFiles;
			}
			Util.renderTemplet({templetId:"history_list_template",
				                containerId:"historyTableDiv",
				                data:result
				                });
		}
	});
};

function showOpinion(data){
	layer.alert(data);
}

showUploadfilesRecord=function(pid,area_id,uploaderName){
	var th_name = uploaderName ? uploaderName : "变更记录";
	var title_name = uploaderName ? uploaderName+"变更记录" : "变更记录";
	$("#uploadfilesRecords_title").text(title_name);
	$("#uploadfilesRecords_th").text(th_name);
	Util.ajax({
			url : contextpath + "/fp/taskcenter/getUploadFilesRecords" ,
			async : false,
			param : {area_id:area_id,pid:pid},
			success: function(result){
				if(result.length==0){
					$("#uploadfilesRecords_tbody").append('<td colspan="5" style="text-align:center;height:40px"><span><font size="2">暂无变更记录</font></span></td>');
				}else{
		               $(result).each(function(i,o){
		            	   var $tr = $('<tr><td><b>序号</b><span>'+(i+1)+'</td>'
										+'<td><b>'+th_name+'</b><span name="files"></span></td>'
										+'<td><b>任务环节</b><span>'+o.NAME+'</span></td>'
										+'<td><b>操作人</b><span>'+o.ACTOR_NAME+'</span></td>'
										+'<td><b>操作时间</b><span>'+o.OPERATE_DATE+'</span></td></tr>');
		            	   $files = $tr.find("span[name='files']:eq(0)");
		            	   $(o.files).each(function(j,k){
		            		   var $p = $('<p class="push-down-0"></p>');
		            		   if(k.OPERATE_TYPE == "del"){
		            			   $p.append('<span class="push-right-10" style="background-color:#fafafa;border:1px solid #ccc;color:#999;height:24px;padding:0 10px;border-radius:4px;">删除</span>')
		            		   }else{
		            			   $p.append('<span class="bg-theme-10 border-theme-40 color-theme-80 push-right-10" style="height:24px;padding:0 10px;border-width:1px;border-style:solid;border-radius:4px;">新增</span>')
		            		   }
		            		   $p.append('<span><a href="'+contextpath+'/formParser?status=fileUpload&action=filedownload&fileName='+encodeURI(k.FILE_NAME)+'&filePath='+k.FILE_PATH+'">'+k.FILE_NAME+'</a></span>');
		            		   $files.append($p);
		            	   })
		            	   $("#uploadfilesRecords_tbody").append($tr);
		               })
				}
			}
		});
    Msg.open({
        skin : 'fp-class',
        title : false,
        type : 1,
        closeBtn : 0,
        maxWidth : 1200,
        content : $('#uploadfilesRecords'),
        success : function(layero, index) {
          $('[name="closeUploadfilesRecords"]').unbind("click").click(function() {
            layer.close(index);
      	    $("#uploadfilesRecords_tbody").empty();
          });
        }
      });
}



showUploadFiles=function(task_id){
	Util.ajax({
		url : contextpath + "/fp/taskcenter/getUploadFilesRecordsOfApprove" ,
		async : false,
		param : {area_id:task_id},
		success: function(result){
			if(result.length==0){
				$("#uploadfilesRecordsOfApprove_tbody").append('<td colspan="5" style="text-align:center;height:40px"><span><font size="2">暂无附件记录</font></span></td>');
			}else{
	               $(result).each(function(i,o){
	            	   var $tr = $('<tr><td><b>附件名称</b><span>'+o.FILE_NAME+'</span></td>'
								+'<td><b>操作</b><span><a class="fa fa-download" href="formParser?status=fileUpload&action=filedownload&fileName='+encodeURI(o.FILE_NAME)+'&filePath='+o.FILE_PATH+'" title="下载" name="download">'
									+'下载</a></span></td></tr>');
	            	   
	            	   $("#uploadfilesRecordsOfApprove_tbody").append($tr);
	               })
			}
		}
	})
	
	Msg.open({
        skin : 'fp-class',
        title : false,
        type : 1,
        closeBtn : 0,
        maxWidth : 1200,
        content : $('#uploadfilesRecordsOfApprove'),
        success : function(layero, index) {
          $('[name="closeUploadfilesRecordsOfApprove"]').unbind("click").click(function() {
            layer.close(index);
      	    $("#uploadfilesRecordsOfApprove_tbody").empty();
          });
          
          
          $('#uploadAll').unbind("click").click(function() {
             var files=    $("#uploadfilesRecordsOfApprove_tbody").find("a");
              if(files==null||files.length<1){
            	  Msg.info("无下载文件")
              }else{
              for (var i = 0; i < files.length; i++) {
            	/*  window.location.href="/fp/"+$("#uploadfilesRecordsOfApprove_tbody").find("a").eq(i).attr("href");*/
            	  $("#uploadfilesRecordsOfApprove_tbody").find("a")[i].click();
				}
              }
             
            });
        }
      });

}