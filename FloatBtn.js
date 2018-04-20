/*
 FloatButton:v1
 GiayNhap
 [Javascript]
 */

 (function(window){

 	FloatButton = function(id)
 	{

 		this.springSystem = new SpringSystem();
 		this.btn  = $("#"+id);
 		this.panel=$("#"+id+"-panel")
 		this.position = this.btn.position();
 		this.size = [$(window).width(),$(window).height()];

 		this.isChange = false;
 		this.isDrag = false;
 		this.isLock= false;
 		this.backup = [];
 		this.hasDrag = false;
 		this.springSystem.onUpdate= this.__update.bind(this);
 		this.init();


 	}
 	FloatButton.prototype = {
 		init:function()
 		{
 			this.loop = setInterval(this.__event.bind(this),50)

 			$(window).resize(this.__resize.bind(this))
 			$(this.btn).mousedown(this.__click_down.bind(this))
 			$(window).mousemove(this.__click_move.bind(this))
 			$(this.btn).mouseup(this.__click_up.bind(this))

 			this.springSystem.setPoint(this.size[0]-55,this.size[1]-80)
 			this.springSystem.start();
 			this.makeTrash();
 			this.fixPanelPosition();

 		},
 		fixPanelPosition:function()
 		{
 			$(this.panel).css({left:(-$(this.panel).width()+30)+"px"})
 		
 		}
 		,makeTrash:function()
 		{
 			var html = '<div class="float-class float-button-trash unset">'+
 			'<div class="float-button-trash-icon ">'+
 			'<div class="label">X</div>'+
 			'</div>'+
 			'</div>';
 			$('body').append(html);

 		}
 		,__event:function()
 		{

 			this.position = [this.btn.position().left,this.btn.position().top];
			//this.checkMove();
			

		},checkMove()
		{
			if (this.position.left >5|| Math.abs(this.size[0] - this.position.left)>5)
			{
				if (!this.isChange )
				{
					this. springSystem.setRoot(this.position[0],this.position[1])
				}
				this.isChange  = true
			}
		}
		,__resize(e)
		{
			this.size = [$(window).width(),$(window).height()];
			
			if (this.remove) return;
			if (this.position[1] > this.size[1]-55)
			{
				this.position[1]= this.size[1]-55;
			}
			if (this.position[0]>100)
			{
				this.position[0] = this.size[0]-55;
			}
			$(this.btn).css({left:this.position[0],top:this.position[1]});

		},__click_down:function(e)
		{

			this.isDrag = true;
			this.hasDrag = false;


		},__click_up:function(e)
		{
			this.isDrag = false;
			if (this.hasDrag )
			{
				$(".float-button-trash").removeClass("float-trash-show")
				if (this.remove)
				{
					$(this.btn).addClass("trash-remove")
					$(this.btn).css({top:"auto"})

				}

				var left = 0;
				if (this.position[0]> this.size[0]/2)
					left = this.size[0]-55;
				this.springSystem.setPoint(left,this.position[1])
				this.springSystem.setRoot(this.position[0],this.position[1])
				this.springSystem.start();
			}else
			{
				this.isLock=!this.isLock;
				if (this.isLock)
				{
					this.backup = [this.position[0],this.position[1]];
					this.springSystem.setPoint(this.size[0]-80,5)
					
					this.springSystem.setRoot(this.position[0],this.position[1])
					this.springSystem.start();
					this.panel.addClass("panel-show")
					this.panel.removeClass("panel-hide")
					this.fixPanelPosition();
				}
				else{
					this.springSystem.setRoot(this.position[0],this.position[1])
					this.springSystem.setPoint(this.backup[0],this.backup[1])
					this.springSystem.start();
					this.panel.addClass("panel-hide")
					this.panel.removeClass("panel-show")
				}

			}


		},__click_move:function(e)
		{

			if (this.isLock) return;
			if (this.isDrag)
			{
				this.hasDrag =true;

				var top = e.clientY-25;
				var left = e.clientX-25;
				
				if (e.clientX>this.size[0]/5&&this.size[0]-e.clientX>this.size[0]/5)
				{
					var trash = $(".float-button-trash");
					trash.addClass("float-trash-show")

					if (e.clientX>trash.position().left&&e.clientX<trash.position().left+40&& top+40>trash.position().top)
					{
						top = trash.position().top
						left = trash.position().left

						$(".float-button-trash-icon ").addClass("trash-zone")
						this.remove= true;

					}
					else{
						$(".float-button-trash-icon ").removeClass("trash-zone")
						this.remove = false;
					}
				}
				else
					$(".float-button-trash").removeClass("float-trash-show")

				$(this.btn).css({top:top+7,left:left+7})

			}
		},__update:function(x,y){
			if (this.isDrag ) return;
			if (this.remove) return;
			this.position[0] = x;
			this.position[1] = y;

			$(this.btn).css({top:y,left:x})
		}
	}
	

	window.FloatButton = FloatButton;

}(window))
