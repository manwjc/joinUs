$(function(){
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
		effect: 'slide',
		loop: false,
		mousewheelControl: true,
		keyboardControl: true,
		onSlideChangeStart: function(){
			changeClass();
		},
		onTouchMove: function(){
			changeClass();	
		}
    });
	
	function changeClass(){
		var $activeSlide = $('.swiper-slide-active');
		$activeSlide.find('.elements').each(function(){
			var dataClass = $(this).attr('data-class');
			$(this).show().addClass(dataClass);
		});
		
		var $prevSlide = $('.swiper-slide-prev');
		$prevSlide.find('.elements').each(function(){
			var dataClass = $(this).attr('data-class');
			if($(this).hasClass(dataClass)){
				$(this).removeClass(dataClass).addClass('hide');	
			}
		});
		
		var $nextSlide = $('.swiper-slide-next');
		$nextSlide.find('.elements').each(function(){
			var dataClass = $(this).attr('data-class');
			if($(this).hasClass(dataClass)){
				$(this).removeClass(dataClass).addClass('hide');	
			}
		});	
	};
	changeClass();
	
	//重置容器尺寸
	function resetBoxSize(){
		var windowHeight = $('.swiper-container').height();
		var windowWidth = $('.swiper-container').width();
		var scaleWindow = windowWidth/windowHeight;
		var scaleDefault = 750/1254;
		if(scaleWindow > scaleDefault){
			var boxWidth = 750*windowHeight/1254;
			$('.page-elements').css({'width':boxWidth, 'height':windowHeight});
		}else{
			var boxHeight = 1254*windowWidth/750;
			$('.page-elements').css({'width':windowWidth, 'height':boxHeight, 'margin-top':(windowHeight-boxHeight)/2});
		}
	}
	resetBoxSize();
	
	//重设图片高度
	function resetConSize(){
		var windowHeight = $('.swiper-container').height();
		var windowWidth = $('.swiper-container').width();
		$('.pagebg img').css({'height':windowHeight,'width':windowWidth});
	}
	resetConSize();
	
	$(window).resize(function(){
		//resetBoxSize();
		//resetConSize();
	});
	

	//音乐控制
	$("#audioPlay").click(function(){
        if(audio.paused){
            audio.play();
            $(this).addClass('circleTiming infinite rotateInCircle');
        }else{
            audio.pause();
            $(this).removeClass('circleTiming infinite rotateInCircle');
        }
    });
    
    // 方法1: 现在微信官方已经推出了微信JS-SDK, 最好还是不要使用"野生"方式, 因为不知道什么时候就可以不能用了!
    // http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
    // 通过config接口注入权限验证配置后, 在 ready 中 play 一下 audio
    function autoPlayAudio() {
        wx.config({
            // 配置信息(必需，即使不正确或为空)，才能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
            document.getElementById('audio').play();
        });
    }
    autoPlayAudio();
    
	//校验
	function validInput(){
		var nameVal = $('.input-name').val();
		var phoneVal = $.trim($('.input-phone').val());
		var regMphone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
		var regPhone = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
		
		if(nameVal == ''){
			alert('请填写物业公司名称');
			return false;
		}else if(phoneVal == ''){
			alert('请填写电话号码');
			return false;
		}else if(!regMphone.test(phoneVal) && !regPhone.test(phoneVal)){
			alert('请填写正确的手机或电话格式');
			return false;
		}else{
			$.ajax({
    			  url: "../commercialOpportunity/saveCOinfo.html",
    			  cache: false,
    			  dataType:"json",
    			  async:true,
    			  data:{"nameVal" : nameVal, "phoneVal":$.trim($('.input-phone').val()) }, 
    			  success: function(data){
    			    alert('提交成功！')
    			  },  
                  error: function(){  
                  	alert('网络不给力，请稍后重试'); 
                  }
    			});
		}
	}
	
	$('.submit-btn').click(function(){
		validInput();
	});
});