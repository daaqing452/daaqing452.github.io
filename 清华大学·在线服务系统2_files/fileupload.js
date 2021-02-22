WebForm.widget("unieap.uploader.uploader",WebForm.FormWidget,{
	_uploaderdiv:null,// 获取整个dom节点
	_id:null,
	_btnName:null,
	_uploaderType:null,
	_filesSizeLimit:null,
	_filesOneceLimit:null,
	_filesTotalLimit:null,      
	_editable:true,
	_create:function(fk_id){
	    fk_id = fk_id?fk_id:dataCenter.getParameter("SYS_FK");
		this._uploaderdiv =this.element;
		this._id = this._uploaderdiv.attr("id");
		var id = this._id;
		var uploaderName = this._uploaderdiv.attr("uploaderName");
		var saveRecord = this._uploaderdiv.attr("saveRecord");
		this.id=this.element.attr("id");
		this._btnName = this._uploaderdiv.attr("btnName");
		this._uploaderType = this._uploaderdiv.attr("uploaderType");
		this._filesSizeLimit = this._uploaderdiv.attr("filesSizeLimit");
		this._filesOneceLimit = this._uploaderdiv.attr("filesOneceLimit");
		this._filesTotalLimit = this._uploaderdiv.attr("filesTotalLimit");
		$("[dojotype='unieap.form.Form']").append('<div class="blueimp-gallery blueimp-gallery-controls" id="blueimp-gallery" style="height:100%;"><div class="slides"></div><h3 class="title"></h3><a class="prev">‹</a> <a class="next">›</a> <a class="close">×</a><ol class="indicator"></ol></div>')
		if(this._uploaderdiv.attr("editable")=="false"){
			this._editable = false;
		}
    	var editable = this._editable;
		if(this._uploaderType!="picture"){
			createFileUpload(fk_id,this,saveRecord,uploaderName);
			inituploadfiles(fk_id,this);
			douploader(this);
		}else{
			    var $btn = $(this._uploaderdiv).find("input:eq(0)");
			    $btn.attr('type','file');
			    $btn.attr('multiple','');
			    $btn.attr('name','files[]');
			    $btn.removeClass('uploader-style');
			    $btn.wrapAll('<span class="btn btn-primary fileinput-button push-down-5"></span>');
			    if(this._btnName){
			    	$btn.before('<i class="fa fa-upload"></i><span>'+this._btnName+'</span>');
			    }else{
			    	$btn.before('<i class="fa fa-upload"></i><span>上传图片</span>');
			    }
			    //表单加载后渲染查看图片组件
			    if(Util.getActinstName()!="填写状态"&&saveRecord=="save"){
				    var record = $('<a class="btn btn-default push-left-10 push-down-5">查看变更记录</a>');
				    $btn.parent().after(record);
				    record.click(function(){
				    	parent.showUploadfilesRecord(fk_id,id,uploaderName);
				    })
			    }
			    $btn.parent().after('<div class="bar responsive-padding-box view-blueimp-gallery push-up-5"><div class="gallery" id="'+$btn.attr('id')+'_imageContainer'+'"></div></div>');
			    $("#"+$btn.attr('id')+"_imageContainer",window.parent.document).parent().remove();
			    $("#page-content",window.parent.document).append('<div style = "display:none"><ul name="pictures" id="'+$btn.attr('id')+'_imageContainer'+'"></ul></div>');
			    inituploadfilesPic(fk_id,this);
				douploaderImage(this);
		    }
		//如果上传控件notnull属性是true，并且不是“不可编辑”的，则append红色*的span
		if($("#"+id).attr("notnull") == "true" && $("#"+id).attr("editable") != "false"){
			$("#"+id).append('<span id="' + id + '_notnullspan" class="notnull" style="width:10px;height:15px;display:inline-block;margin-left:6px;"></span>');
		}
		
		//监听上传控件notnull属性的变化。如果div新增了notnull，则append一个span；如果div删除了notnull则把span删除；
		var targetNode = $("#"+id)[0];
		var options = { attributes: true, childList: false,subtree:false,attributeOldValue:true};
		function callback(mutationsList, observer) {
			mutationsList.forEach(function(record) {
		    	if(record.attributeName=="notnull"){
		    	// 如果发生变化的属性是notnull
		    		if($("#"+id).attr("notnull") == "true" && $("#"+id).attr("editable") != "false" && $("#"+id + "_notnullspan").length == 0){
		    			//如果notnull为true了，并且当前不是“不可编辑”的，并且当前没有红色*的span
		    			$("#"+id).append('<span id="' + id + '_notnullspan" class="notnull" style="width:10px;height:15px;display:inline-block;margin-left:6px;"></span>');
		    		}else if(($("#"+id).attr("notnull") == undefined || $("#"+id).attr("notnull") != "true") && $("#"+id + "_notnullspan").length == 1){
		    			//（如果notnull属性不存在，或者notnull属性不等于true）并且红色*的span存在
		    			$("#"+id + "_notnullspan").remove();
		    		}
		    	}
	       });
		}
		if(navigator.userAgent.toLowerCase().indexOf("msie") == -1){
			var mutationObserver = new MutationObserver(callback);
			mutationObserver.observe(targetNode, options);
		}
		//监听上传控件notnull属性的变化end
	},
	//绑定数据
	bindData:function(){},
	//渲染数据
	inituploadData:function(fk_id,isNewId){
	   	if(this._uploaderType!="picture"){
			inituploadfiles(fk_id,this,isNewId);
		}else{
		    inituploadfilesPic(fk_id,this,isNewId);
		}
	},
	//提交时的处理
	submitValue:function(){
		
		var divId = this._id;
		dataCenter.removeDataStore(divId);
		var uploadDataStore = new unieap.ds.DataStore(divId);
		uploadDataStore.setParameter("uploader","true");
		uploadDataStore.setParameter("exist","true");
		uploadDataStore.setParameter("SYS_FK",dataCenter.getParameter("SYS_FK"));
		
		var uploadRowSet=new unieap.ds.RowSet();
		uploadDataStore.rowSet=uploadRowSet;
		dataCenter.addDataStore(divId,uploadDataStore);
		if(this._uploaderdiv.attr("uploaderType")!="picture"){
			//遍历上传附件
			this._uploaderdiv.find("[action='newAffix']").each(function(){
				var up_id = $(this).attr("id");
				var file_size = $(this).attr("file_size");
				var up_relative_path = $(this).attr("relative_path");
				var up_file_new_name = $(this).attr("file_new_name");
				var up_newurl = $(this).attr("newurl");
				var up_encodeName = $(this).attr("encodeName");
				uploadRowSet.addRow({"div_id":divId,"up_id":up_id,"file_size":file_size,"up_relative_path":up_relative_path,"up_file_new_name":up_file_new_name,"up_newurl":up_newurl,"up_encodeName":up_encodeName});
			});  
			//当附件全部删除后，仍然装一条空的row，否则无法运行到DefaultExtSaveOrUpdateDataSet
			if(this._uploaderdiv.find("[action='newAffix']").length==0) {
				uploadRowSet.addRow({});
			}
		}else{
			var area_id = "btn_"+divId+"_imageContainer";
			$("#"+area_id).children("a").each(function(j,k){
				uploadRowSet.addRow({"div_id":divId,"up_id":$(k).attr("id"),"file_size":$(k).attr("size"),"up_relative_path":"","up_file_new_name":$(k).attr("title"),"up_newurl":$(k).find("[imgViewer='imgViewer']").attr("src"),"up_encodeName":encodeURI($(k).attr("title"))});
			})
			if($("#"+area_id).children("a").length==0){
				uploadRowSet.addRow({});
			}
		}
	}
});

createFileUpload = function(fk_id,dom,saveRecord,uploaderName){
	$("#"+dom.id).empty();
	var fileUpload = "";
	if(dom._btnName){
		fileUpload = "<span class='btn btn-primary fileinput-button push-down-5'><i class='fa fa-upload'></i><span>"+dom._btnName+
		"</span><input id='"+"btn_"+dom.id+"' type='file' name='files[]' multiple></span>";
	}else{
		fileUpload = "<span class='btn btn-primary fileinput-button push-down-5'>"+
		"<input id='"+"btn_"+dom.id+"' type='file' name='files[]' multiple></span>";
	}
	$("#"+dom.id).append(fileUpload);
	
    //表单加载后渲染查看图片组件
    if(Util.getActinstName()!="填写状态"&&saveRecord=="save"){
	    var record = $('<a class="btn btn-default push-left-10 push-down-5">查看变更记录</a>');
	    $("#"+dom.id).children("span:eq(0)").after(record);
	    record.click(function(){
	    	parent.showUploadfilesRecord(fk_id,dom.id,uploaderName);
	    })
    }
};

inituploadfiles = function(fk_id,dom,isNewId) {
	if(!dataCenter.dataStores[dom._id]){
		return;
	}
	var files = dataCenter.dataStores[dom._id].getRowSet().getData(3);
	for(var index = 0; index < files.length; index ++) {
		var divId = dom.id;
		var file = files[index];
		var id = isNewId?Math.getUuid("fileupload",25,32):file.up_id;
		var type = file.file_new_name;
		var name = file.file_old_name;
		var officeonline = file.office_online;
		var pan_path = file.pan_path;
		var relative_path=file.relative_path;
		var file_new_name=file.file_new_name;
		var newurl=relative_path+file_new_name;//新文件名字
		var encodeName=encodeURIComponent(name);//文件原名
		var newurl = relative_path + file_new_name;
		var file_size = Number(file.file_size);
		
		var spanHTML = "<span class = 'bar push-up-3' action='newAffix' id='" + id + "' name='after_insert' "
		+ " file_size='"+file_size+"'"
		+ " relative_path='"+relative_path+"'"
		+ " file_new_name='"+file_new_name+"'"
		+ " newurl='"+newurl+"'"
		+ " encodeName='"+encodeName+"'"
		+" style='margin-right:20px;'>"
		+"<b style='margin:-2px 3px 0 0px;height:20px;' class='"
		+ fixFileTypeIcon(type)
		+ "'></b>"
		+ "<a target='_blank' href='"+WEBAPP+"/formParser?status=fileUpload&action=filedownload&fileName="+encodeName+"&filePath="+newurl+"' class='annex_link text-primary'>"+name+"</a>";
		if(dom._editable){
			spanHTML = spanHTML + "  <a style='color:#0099CC' id='affix' email_id='' file_id='"
			+ id
			+ "' href='javascript:deleteFile(\""
			+ id + "\")'><font size='3'>(×移除)</font></a>" ;
		}
		String.prototype.endWith = function(endStr){
			var d=this.length-endStr.length;
			return (d>=0&&this.lastIndexOf(endStr)==d);
		};
		if(officeonline!=null && officeonline!="" && officeonline!="false"){
			if(file_new_name.endWith(".doc") || file_new_name.endWith(".docx") || file_new_name.endWith(".xls") || file_new_name.endWith(".xlsx") || file_new_name.endWith(".ppt") || file_new_name.endWith(".pptx") ){
				spanHTML = spanHTML + "<a style='color:#0099CC' href='"+ WEBAPP + "/officePreviewRedirect?filename=" + name +"&filepath=" + newurl + "'  target='_blank' rel='nofollow'><font size='3'>（@在线预览）</font></a>";
			}
		}
		if(file_new_name.endWith(".pdf")){
			spanHTML = spanHTML + "<a style='color:#0099CC' href='"+WEBAPP+"/resource/pdfjs/web/viewer.html?file="+WEBAPP+"/"+newurl+"' target='_blank'><font size='3'>（@在线预览）</font></a>";
		}
		if(file_new_name.endWith(".txt")){
			spanHTML = spanHTML +"<a style='color:#0099CC' onClick=showTxt('"+newurl+"') target='_blank'><font size='3'>（@在线预览）</font></a>";
		}
		if(file_new_name.endWith(".png")||file_new_name.endWith(".jpg")||file_new_name.endWith(".jpeg")){
			spanHTML = spanHTML +"<a imgViewerOne='imgViewerOne' url='"+newurl+"' title='"+file_new_name+"' style='color:#0099CC' target='_blank'><font size='3'>（@在线预览）</font></a>";
		}
		$("#"+divId).append(spanHTML+"</span>");
	} 
};

inituploadfilesPic = function(fk_id,dom,isNewId) {
		    	var pid=fk_id;
		    	if(pid){
					Util.ajax({
						url:WEBAPP +"/fp/serveapply/getImage",
						param:{pid:pid,area_id:dom.id},
						async:false,
					    method:"POST",
						success:function(data){
		                     $(data).each(function(i,o){
		                    	 var galleryClass = "";
		                    	 if(IsPC()){
		                    		 galleryClass = "gallery-item";
		                    	 }else{
		                    		 galleryClass = "gallery-item active";
		                    	 }
		                    	 var imgId = Math.getUuid("img",25,32);
		                    	 if(dom._editable){
			                    	 $("#btn_"+o.AREA_ID+"_imageContainer").append('<a class="'+galleryClass+'" size="'+o.FILE_SIZE+'" id="'+(isNewId?Math.getUuid("fileupload",25,32):o.ID)+'"  title="'+o.FILE_NAME+'"><div class="image"><img imgViewer="imgViewer" id="'+imgId+'" src="'+o.FILE_PATH+'" alt="'+o.FILE_NAME+'"/><ul class="gallery-item-controls"><li><span class="gallery-item-remove"><i class="fa fa-times"></i></span></li></ul></div></a>')
		                    	 }else{
		                    		 $("#btn_"+o.AREA_ID+"_imageContainer").append('<a class="'+galleryClass+'" size="'+o.FILE_SIZE+'" id="'+(isNewId?Math.getUuid("fileupload",25,32):o.ID)+'"  title="'+o.FILE_NAME+'"><div class="image"><img imgViewer="imgViewer" id="'+imgId+'" src="'+o.FILE_PATH+'" alt="'+o.FILE_NAME+'"/></div></a>')
		                    	 }
		                    	 $("#btn_"+o.AREA_ID+"_imageContainer",window.parent.document).append('<li><img id="'+imgId+'"  data-original="'+o.FILE_PATH+'" src="'+o.FILE_PATH+'" alt="'+o.FILE_NAME+'"></li>')
		                     })
						}
				    });
		    	}
};
showTxt = function(txturl){
	window.open(WEBAPP+"/view?m=fp#filepath="+txturl+"&act=fp/readtxt");
};
var nowquenednum = 0;
douploader = function(dom) {
	var disabled = false;
	if(!dom._editable){
		disabled = true;
	}
	var stop = false;
	var upload_name = dom._btnName;
	var upload_max_nums = dom._filesOneceLimit;
	var upload_max_nums2 = dom._filesTotalLimit;
	var upload_max_file = dom._filesSizeLimit;
	var btn_upload_id = "btn_"+dom.id;
	var haveSaved = $("span[action='newAffix']").size();
	function fileDialogComplete(files) {//1
		var allowformat = $("#"+dom.id).attr("allowformat");
		if(allowformat!=""&&allowformat!=undefined){
			$(files).each(function(j,k){
				var flag = false;
				var format = k.name.substring(k.name.lastIndexOf(".")+1,k.name.length);
				$(allowformat.split(",")).each(function(i,o){
	                      if(format==o||(format+"_")==o||format.toLowerCase()==o||(format.toLowerCase()+"_")==o){
	                    	  flag = flag || "true";
	                      }
				})
				if(!flag){
					stop = true;
					alert(format+"类型的文件不允许被上传！支持上传的文件格式有："+allowformat.replace(/_/g,''));
				}else{
					stop = false;
				}
			})
		}else{
			stop = false;
		}
		//upload_max_nums1
		var numFilesSelected = files.length;
		var haveSaved = $("#"+dom.id).find("span[action='newAffix']").size();
		if(!stop && (haveSaved+numFilesSelected>parseInt(upload_max_nums2))) {
			stop = true;
			alert("上传文件总数不能超过"+upload_max_nums2+"个。");
		}
		if (!stop && numFilesSelected != 0 && parseInt(upload_max_nums2) > haveSaved) {
			if(numFilesSelected > parseInt(upload_max_nums)) {
				stop = true;
				alert("每批最多上传"+upload_max_nums+"个附件");
			}
		}
		if(!stop){
			var maxSize = parseInt(upload_max_file)*1000000;
			var excessFile = "";
			for(var i=0;i<numFilesSelected;i++){
				var file = files[i];
				if(file.size && file.size>maxSize){
					excessFile = excessFile+file.name+",";
				}
			}
			if(excessFile.length>0){
				stop = true;
				alert(excessFile.substring(0,excessFile.length-1)+" 不可超过"+upload_max_file+"MB");
			}
		}
	}
	function uploadSuccess(file, serverData) {
		var divId = dom.id;
		var json=serverData; 
		var id = file.id;
		var type = file.type;
		var name = file.name;
		var relative_path=json.relative_path;
		var officeonline = json.office_online;
		var pan_path = json.pan_path;
		var file_new_name=json.file_new_name;
		var newurl=relative_path+file_new_name;//新文件名字
		var encodeName=encodeURIComponent(name);//文件原名
		var newurl = relative_path + file_new_name;
		var file_size = Number(json.file_size);
		var Str = "<span class = 'bar push-up-3' action='newAffix' id='" + id + "' name='after_insert' "
					+ " file_size='"+file_size+"'"
					+ " relative_path='"+relative_path+"'"
					+ " file_new_name='"+file_new_name+"'"
					+ " newurl='"+newurl+"'"
					+ " encodeName='"+encodeName+"'"
					+" style='margin-right:20px;'>"
					+"<b style='margin:-2px 3px 0 0px;height:20px;' class='"
					+ fixFileTypeIcon(type)
					+ "'></b>"
					+ "<a target='_blank' href='"+WEBAPP+"/formParser?status=fileUpload&action=filedownload&fileName="+encodeName+"&filePath="+newurl+"' class='annex_link text-primary'>"
					+name+"</a>"
					+ "  <a style='color:#0099CC' id='affix' email_id='' file_id='"
					+ id
					+ "' href='javascript:deleteFile(\""
					+ id + "\")'><font size='3'>(×移除)</font></a>";
		String.prototype.endWith = function(endStr){
			var d=this.length-endStr.length;
			return (d>=0&&this.lastIndexOf(endStr)==d);
		};
		if(officeonline!=null && officeonline!="" && officeonline!="false"){
			if(file_new_name.endWith(".doc") || file_new_name.endWith(".docx") || file_new_name.endWith(".xls") || file_new_name.endWith(".xlsx") || file_new_name.endWith(".ppt") || file_new_name.endWith(".pptx") ){
				Str = Str + "<a style='color:#0099CC' href='"+ WEBAPP + "/officePreviewRedirect?filename=" + name +"&filepath=" + newurl +"' target='_blank' rel='nofollow'><font size='3'>（@在线预览）</font></a>";
			}
		}

		if(file_new_name.endWith(".pdf")){
			Str = Str +"<a style='color:#0099CC' href='"+WEBAPP+"/resource/pdfjs/web/viewer.html?file="+WEBAPP+"/"+newurl+"' target='_blank'><font size='3'>（@在线预览）</font></a>";
		}
		if(file_new_name.endWith(".txt")){
			Str = Str +"<a style='color:#0099CC' onClick=showTxt('"+newurl+"') target='_blank'><font size='3'>（@在线预览）</font></a>";
		}
		if(file_new_name.endWith(".png")||file_new_name.endWith(".jpg")||file_new_name.endWith(".jpeg")){
			Str = Str +"<a  imgViewerOne='imgViewerOne' url='"+newurl+"' title='"+file_new_name+"' style='color:#0099CC' target='_blank'><font size='3'>（@在线预览）</font></a>";
		}
		$("#"+divId).append(Str+"</span>");
	}
	var hash = parent.location.hash;
	var serviceIdApply = Util.getHash(hash, "serveID", "");
	var serviceIdTask = Util.getHash(hash, "service_id", "");
	var serviceId = (serviceIdApply == "" || serviceIdApply == undefined) ? serviceIdTask : serviceIdApply;
	var url = WEBAPP+'/formParser?status=fileUpload&action=fileupload&serviceId='+serviceId;
	$("#"+btn_upload_id).fileupload({
        url: url,
        dataType: 'json',
        disabled:disabled,
        autoUpload: true,
        singleFileUploads:false,
        sequentialUploads:true,
        forceIframeTransport:false,
        multipart:true,
        maxFileSize: parseInt(upload_max_file)*1000000,
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        disableImagePreview:true
    }).on('fileuploadadd', function (e, data) {
    	fileDialogComplete(data.files,0,0);
    }).on('fileuploadsubmit', function (e, data) {
    	if(stop){
    		return false;
    	}
    }).on('fileuploaddone', function (e, data) {
    	var result = data.result;
    	if(result.success){
    		var file_new_name_Array = [];
    		var file_old_name_Array = [];
    		var file_size_Array = [];
    		if(result.file_new_name){
    			file_new_name_Array = result.file_new_name.split(",");
    		}
    		if(result.file_old_name){
    			file_old_name_Array = result.file_old_name.split(",");
    		}
    		if(result.file_size){
    			file_size_Array = result.file_size.split(",");
    		}
    		var relative_path = result.relative_path;
    		var office_online = result.office_online;
    		var pan_path = result.pan_path;
        	$.each(data.files, function (index, file) {
        		var serverData={};
        		serverData.file_new_name = file_new_name_Array[index];
        		serverData.file_old_name = file_old_name_Array[index];
        		serverData.relative_path = relative_path;
        		serverData.office_online = office_online;
        		serverData.pan_path = pan_path;
        		serverData.file_size = file_size_Array[index];
        		file.id=Math.getUuid("fileupload",25,32);
            	uploadSuccess(file,serverData);
            });
    	}else{
    		alert(result.result);
    	}
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            alert(data.files[index].name+" 上传失败！");
        });
    }).prop('disabled', !$.support.fileInput || disabled)
        .parent().addClass(!$.support.fileInput || disabled ? 'disabled' : undefined);
};




douploaderImage = function(dom) {
	var disabled = false;
	if(!dom._editable){
		disabled = true;
	}
	var stop = false;
	var upload_name = dom._btnName;
	var upload_max_nums = dom._filesOneceLimit;
	var upload_max_nums2 = dom._filesTotalLimit;
	var upload_max_file = dom._filesSizeLimit;
	var btn_upload_id = "btn_"+dom.id;
	var haveSaved = $("span[action='newAffix']").size();
	function fileDialogComplete(files) {//1
		var allowformat = $("#"+dom.id).attr("allowformat");
		if(allowformat!=""&&allowformat!=undefined){
			$(files).each(function(j,k){
				var flag = false;
				var format = k.name.substring(k.name.lastIndexOf(".")+1,k.name.length);
				$(allowformat.split(",")).each(function(i,o){
	                      if(format==o||(format+"_")==o||format.toLowerCase()==o||(format.toLowerCase()+"_")==o){
	                    	  flag = flag || "true";
	                      }
				})
				if(!flag){
					stop = true;
					alert(format+"类型的文件不允许被上传！支持上传的文件格式有："+allowformat.replace(/_/g,''));
				}else{
					stop = false;
				}
			})
		}else{
			stop = false;
		}
		//upload_max_nums1
		var numFilesSelected = files.length;
		var haveSaved = $("#"+dom.id).find("span[action='newAffix']").size();
		if(!stop && (haveSaved+numFilesSelected>parseInt(upload_max_nums2))) {
			stop = true;
			alert("上传文件总数不能超过"+upload_max_nums2+"个。");
		}
		if (!stop && numFilesSelected != 0 && parseInt(upload_max_nums2) > haveSaved) {
			if(numFilesSelected > parseInt(upload_max_nums)) {
				stop = true;
				alert("每批最多上传"+upload_max_nums+"个附件");
			}
		}
		if(!stop){
			var maxSize = parseInt(upload_max_file)*1000000;
			var excessFile = "";
			for(var i=0;i<numFilesSelected;i++){
				var file = files[i];
				if(file.size && file.size>maxSize){
					excessFile = excessFile+file.name+",";
				}
			}
			if(excessFile.length>0){
				stop = true;
				alert(excessFile.substring(0,excessFile.length-1)+" 不可超过"+upload_max_file+"MB");
			}
		}
	}
	var hash = parent.location.hash;
	var serviceIdApply = Util.getHash(hash, "serveID", "");
	var serviceIdTask = Util.getHash(hash, "service_id", "");
	var serviceId = (serviceIdApply == "" || serviceIdApply == undefined) ? serviceIdTask : serviceIdApply;
	var url = WEBAPP+'/formParser?status=fileUpload&action=fileupload&serviceId='+serviceId;
	$("#"+btn_upload_id).fileupload({
        url: url,
        dataType: 'json',
        disabled:disabled,
        autoUpload: true,
        singleFileUploads:false,
        sequentialUploads:true,
        forceIframeTransport:false,
        multipart:true,
        maxFileSize: parseInt(upload_max_file)*1000000,
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        disableImagePreview:true
    }).on('fileuploadadd', function (e, data) {
    	fileDialogComplete(data.files,0,0);
    }).on('fileuploadsubmit', function (e, data) {
    	if(stop){
    		return false;
    	}
    }).on('fileuploaddone', function (e, data) {
    	var result = data.result;
    	if(result.success){
    		var file_new_name_Array = [];
    		var file_old_name_Array = [];
    		var file_size_Array = [];
    		if(result.file_new_name){
    			file_new_name_Array = result.file_new_name.split(",");
    		}
    		if(result.file_old_name){
    			file_old_name_Array = result.file_old_name.split(",");
    		}
    		if(result.file_size){
    			file_size_Array = result.file_size.split(",");
    		}
    		var relative_path = result.relative_path;
    		var office_online = result.office_online;
    		var pan_path = result.pan_path;
    		if(disabled){
            	$.each(data.files, function (index, file) {
            		var serverData={};
            		serverData.file_new_name = file_new_name_Array[index];
            		serverData.file_old_name = file_old_name_Array[index];
            		serverData.relative_path = relative_path;
            		serverData.office_online = office_online;
            		serverData.pan_path = pan_path;
            		serverData.file_size = file_size_Array[index];
            		file.id=Math.getUuid("fileupload",25,32);
	               	 var galleryClass = "";
	            	 if(IsPC()){
	            		 galleryClass = "gallery-item";
	            	 }else{
	            		 galleryClass = "gallery-item active";
	            	 }
	            	 var imgId = Math.getUuid("img",25,32);
            		$("#"+btn_upload_id+"_imageContainer").append('<a class="'+galleryClass+'" size="'+serverData.file_size+'" id="'+file.id+'"  title="'+
            		  serverData.file_old_name+'"><div class="image"><img imgViewer="imgViewer" id = "'+imgId+'" src="'+serverData.relative_path+serverData.file_new_name+'" alt="'+
            		  serverData.file_old_name+'"/></div></a>');
            		$("#"+btn_upload_id+"_imageContainer",window.parent.document).append('<li><img id="'+imgId+'"  data-original="'+serverData.relative_path+serverData.file_new_name+'" src="'+serverData.relative_path+serverData.file_new_name+'" alt="'+serverData.file_old_name+'"></li>')
                });
    		}else{
            	$.each(data.files, function (index, file) {
            		var serverData={};
            		serverData.file_new_name = file_new_name_Array[index];
            		serverData.file_old_name = file_old_name_Array[index];
            		serverData.relative_path = relative_path;
            		serverData.office_online = office_online;
            		serverData.pan_path = pan_path;
            		serverData.file_size = file_size_Array[index];
            		file.id=Math.getUuid("fileupload",25,32);
	               	 var galleryClass = "";
	            	 if(IsPC()){
	            		 galleryClass = "gallery-item";
	            	 }else{
	            		 galleryClass = "gallery-item active";
	            	 }
	            	 var imgId = Math.getUuid("img",25,32);
            		$("#"+btn_upload_id+"_imageContainer").append('<a class="'+galleryClass+'" size="'+serverData.file_size+'" id="'+file.id+'"  title="'+
            		  serverData.file_old_name+'"><div class="image"><img imgViewer="imgViewer" id="'+imgId+'" src="'+serverData.relative_path+serverData.file_new_name+'" alt="'+
            		  serverData.file_old_name+'"/><ul class="gallery-item-controls"><li><span class="gallery-item-remove"><i class="fa fa-times"></i></span></li></ul></div></a>');
            		$("#"+btn_upload_id+"_imageContainer",window.parent.document).append('<li><img id="'+imgId+'"  data-original="'+serverData.relative_path+serverData.file_new_name+'" src="'+serverData.relative_path+serverData.file_new_name+'" alt="'+serverData.file_old_name+'"></li>')
                });
    		}
    	}else{
    		alert(result.result);
    	}
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index) {
            alert(data.files[index].name+" 上传失败！");
        });
    }).prop('disabled', !$.support.fileInput || disabled)
        .parent().addClass(!$.support.fileInput || disabled ? 'disabled' : undefined);
};



deleteFile = function(affix_id,oaemail_id){
	if(oaemail_id==null){
		oaemail_id="";
	}
	$("span#" + affix_id).remove();
};

IsPC = function() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

fixFileTypeIcon = function(type){
    var tmp = type.split(".");
    if(tmp[1])
    		var fix = tmp[tmp.length - 1].toLowerCase();
    else return "";
    switch(fix){
        case "doc": return "doc";   
        case "wps": return "doc";
        case "zip": return "zip";   
        case "rar": return "zip";   
        case "ace": return "zip";   
        case "7z": return "zip";
        case "swf": return "swf";   
        case "fla": return "swf";
        case "rmv": return "dvd";   
        case "rm": return "dvd";   
        case "wmv": return "dvd";   
        case "avi": return "dvd";   
        case "mpg": return "dvd";
        case "chm": return "book";   
        case "pdf": return "book";
        case "ppt": return "ppt";   
        case "xls": return "xls";
        case "exe": return "exe";   
        case "bat": return "exe";
        case "cpp": return "scr";   
        case "js": return "scr";   
        case "jav": return "scr";   
        case "css": return "scr";
        case "cs": return "scr";   
        case "h": return "scr";   
        case "cgi": return "scr";
        case "jpg": return "img";   
        case "gif": return "img";   
        case "png": return "img";   
        case "psd": return "img";   
        case "bmp": return "img";
        case "htm": return "htm";   
        case "xml": return "htm";   
        case "xht": return "htm";   
        case "sht": return "htm";
        case "asp": return "htm";   
        case "jsp": return "htm";   
        case "php": return "htm";   
        case "txt": return "txt";
        case "cfg": return "cfg";   
        case "dll": return "cfg";   
        case "ini": return "cfg";
        case "mp3": return "mp3";   
        case "wma": return "mp3";   
        case "ape": return "mp3";   
        case "wav": return "mp3";   
        case "mid": return "mp3";
        default: return "oth";
    };
};
$(document).off("click",".gallery-item-controls").on("click",".gallery-item-controls",function(e){
    $(".blueimp-gallery").hide();
    $("#"+$(this).prev().attr("id"),window.parent.document).remove();
    $(this).parent().parent().remove();
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
})
$(document).off("click",".gallery-item").on("click",".gallery-item",function(e){
	parent.renderViewer($(this).parents(".gallery").attr("id"));
	$("#"+$(this).find("[imgViewer='imgViewer']").attr("id"),window.parent.document).trigger("click");
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
})
$(document).off("click","a[imgViewerOne='imgViewerOne']").on("click","a[imgViewerOne='imgViewerOne']",function(e){
	var picInfo = {};
	var $this = $(this);
	picInfo.id=$(this).parents("span").attr("id");
	picInfo.url=$this.attr("url");
	picInfo.name=$this.prevAll(".text-primary").text();
	parent.renderViewerOne(picInfo);
	$("#"+picInfo.id,window.parent.document).trigger("click");
	$(".viewer-next",window.parent.document).hide();
	$(".viewer-prev",window.parent.document).hide();
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
})