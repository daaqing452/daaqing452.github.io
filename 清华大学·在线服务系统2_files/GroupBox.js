WebForm.widget("unieap.form.GroupBox",WebForm.FormWidget,{
	groupBoxVm:null,//vue对象
	isVue:false,
	sortObject:{},//排序对象
	direction:'',
	type:'',
	change:null,//change回调
	bindChangeEvent:function(callback){
		this.change=callback;
	},
	_create:function(){
		if(this.element.attr("isVue")==="true"){//新配置的groupbox有vue属性
			this.isVue = true;
		}
		this.type = this.element.attr("type");
		this.direction = this.element.attr("direction");
		this.inputNodes=[];//输入域节点
		this.labels=[];
		this._super(arguments);
		var that=this;
		var isNotNull=false;
		if(this.element.attr("notnull")){
			this.element.addClass("notnull");
			isNotNull=true;
		}
		if (this.isVue) {
			var vantStr = '';
			if (this.type==='radio') {
				vantStr = '<van-radio-group v-model="result" direction="'+this.direction+'" :disabled="isDisabled" @change="change()">';
				this.element.find(".checkbox-label").each(function(i,o){//遍历选项
				    vantStr = vantStr+'<van-radio name="'+$(o).text()+'">'+$(o).text()+'</van-radio>';
				});
				vantStr = vantStr+'</van-radio-group>'
			} else if (this.type==='checkbox'){
				vantStr = '<van-checkbox-group v-model="result" direction="'+this.direction+'" :disabled="isDisabled" @change="change()">';
				var widgetObject = this;
				this.element.find(".checkbox-label").each(function(i,o){//遍历选项
				    vantStr = vantStr+'<van-checkbox shape="square" name="'+$(o).text()+'">'+$(o).text()+'</van-checkbox>';
				    widgetObject.sortObject[$(o).text()]=i;
				});
				vantStr = vantStr+'</van-checkbox-group>'
			}else{
				this.element.empty();
				return;
			}
			$('<div id="'+this.element.attr("id")+'_vant"></div>').appendTo(this.element.empty()).append(vantStr);
			this.groupBoxVm = new Vue({
				el:'#'+this.element.attr("id")+'_vant',
				data:{
					result:[],
					jqObj:this.element,
					isDisabled:this.element.attr("disabled") && this.element.attr("disabled")=="disabled"
				},
				methods:{
					change:function(){
						var groupbox=this.jqObj;
						var flag=false;
						if(this.result.length>0){
							flag=true;
						}
						if(flag&&this.result instanceof Array){//有值且是数组，则排序
                             Util.shellSort(this.result,groupbox.data("FormWidget").sortObject);
						}
						if(flag==false && this.jqObj.attr("notnull") == "true"){
						  if(groupbox.data("qtip")){
						    var api = groupbox.qtip("api");
						    api.set("content.text",WebForm_I18N.validate.notnull);
						    api.toggle(true);
						  }else{
						    groupbox.formTooltip({
						      content:WebForm_I18N.validate.notnull,
						      my:"left top",
						      at:"right bottom"
						    });
						  }
						}else{
						  if(groupbox.data("qtip")){
						    var api = groupbox.qtip('api');
						    api.destroy(true);
						  }
						}
						if(this.jqObj.data("FormWidget").change!=null){
							this.jqObj.data("FormWidget").change.call(this.jqObj,this.result);
						}
					}
				},
				mounted: function () {
					$(".van-icon",this.jqObj).css("font-weight","bold");
					if (this.isDisabled) {
						$(".van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon",this.jqObj).css("color","#1989fa");
						$(".van-radio__icon--disabled.van-radio__icon--checked .van-icon",this.jqObj).css("color","#1989fa");
					}
					$(".van-checkbox-group--vertical",this.jqObj).addClass("push-right-15");
					$(".van-checkbox--vertical",this.jqObj).addClass("push-down-10");
					$(".van-checkbox__label",this.jqObj).addClass("color-666");
					$(".van-radio-group--vertical",this.jqObj).addClass("push-right-15");
					$(".van-radio--vertical",this.jqObj).addClass("push-down-10");
					$(".van-radio__label",this.jqObj).addClass("color-666");
					$(".van-checkbox--horizontal",this.jqObj).addClass("push-down-5");
					$(".van-checkbox--horizontal",this.jqObj).addClass("push-up-5");
					$(".van-radio--horizontal",this.jqObj).addClass("push-down-5");
                    $(".van-radio--horizontal",this.jqObj).addClass("push-up-5");
                    var jqObj = this.jqObj;
                    setTimeout(function(){
                        if(jqObj.data("FormWidget").change!=null && jqObj.data("FormWidget").currentValue ==""){
                            jqObj.data("FormWidget").change.call(jqObj,null);
                        }
                    },100);

			    },
			    updated: function () {
				  this.$nextTick(function () {
				    $(".van-icon",this.jqObj).css("font-weight","bold");
					if (this.isDisabled) {
						$(".van-checkbox__icon--disabled.van-checkbox__icon--checked .van-icon",this.jqObj).css("color","#1989fa");
						$(".van-radio__icon--disabled.van-radio__icon--checked .van-icon",this.jqObj).css("color","#1989fa");
					}
					$(".van-checkbox--vertical",this.jqObj).addClass("push-down-10");
					$(".van-checkbox__label",this.jqObj).addClass("color-666");
					$(".van-radio--vertical",this.jqObj).addClass("push-down-10");
					$(".van-radio__label",this.jqObj).addClass("color-666");
				  })
			    }
			})
		} else{
			this.element.find("input").each(function(index){
				that.inputNodes.push(this);
				if(isNotNull){
					$(this).on('click',groupboxClickEvent);
				}
				//如果groupbox的disabled=="disabled",radio和checkbox都不可点击
				if(that.element.attr("disabled") && that.element.attr("disabled")=="disabled"){
					$(this).attr("disabled",true);
				}else{
					$(this).attr("disabled",false);
				}
			});
			this.element.find("label").each(function(index){
				that.labels.push(this);
			});
		}
		//监听控件notnull属性的变化。如果新增了notnull属性，则.addClass("notnull")；如果删除了notnull属性，则.removeClass("notnull")；
		var targetNode = this.element[0];
		var options = { attributes: true, childList: false,subtree:false,attributeOldValue:true};
		function callback(mutationsList, observer) {
			mutationsList.forEach(function(record) {
		    	if(record.attributeName=="notnull"){
		    	// 如果发生变化的属性是notnull
		    		if($(record.target).attr("notnull") == "true" && $(record.target).attr("disabled") == undefined){
		    			//如果notnull为true了，并且当前不是“disabled”的，addClass("notnull");
		    			$(record.target).addClass("notnull");
		    		}else if($(record.target).attr("notnull") == undefined){
		    			//如果notnull属性不存在，removeClass("notnull");
		    			$(record.target).removeClass("notnull");
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

	//根据当前currentValue值设置dom
	setDomValue:function(){
		if(!this.currentValue)
			return;
		var values=this.currentValue.split(",");
		if(this.isVue){
			if(this.type==='radio'){
				this.groupBoxVm.$data.result = values[0];
			}else if(this.type==='checkbox'){
			    this.groupBoxVm.$data.result = values;
			}
		}else{
			for(var i=0;i<values.length;i++){
				var value=values[i];
				var inputNode=getInputByLabelValue.call(this,value);
				inputNode&&$(inputNode).attr("checked",true);
			}
			
			function getInputByLabelValue(value){
				for(var i=0;i<this.labels.length;i++){
					var label=this.labels[i];
					if(label.innerHTML.replace(/<.+?>/gim,'')==value)
						return this.inputNodes[i];
				}
			}
		}
	},
	submitValue:function(){
		var values=[];
		if(this.isVue){
			values = this.groupBoxVm.$data.result;
		}else{
			for(var index in this.inputNodes){
				if($(this.inputNodes[index]).is(":checked")){
					values.push(this.labels[index].innerHTML.replace(/<.+?>/gim,''));
				}
			}
		}
		if(values.length>0){
			if($.isArray(values)){
			    this.currentValue=values.join(",");
			}else{
				this.currentValue=values;
			}
		}else{
			this.currentValue="";
		}
		this._super(arguments);
	}
});