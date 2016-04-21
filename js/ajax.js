/**
 * created by swj
 */

(function() {
	var oinput = document.querySelector(".inputArea"); //获取输入框
	var oul = document.getElementsByClassName("oul")[0]; //获取ul
	var oli = oul.getElementsByTagName("li");
	var inputDeal = {
		handleValue: function(value) {
			if (value === "") {
				oul.style.display = "none";
			} else {
				ajax("ajax.txt", {
					onsuccess: this.prompt
				})
			}
		},
		prompt: function(data) {
			var reg = new RegExp("^" + value, "i");
			var promptArr = eval(data);
			var liEement = "";
			for (var i = 0, len = promptArr.length; i < len; i++) {
				var valueMatch = promptArr[i].match(reg);
				if (valueMatch) {
					liEement += "<li><span>" + valueMatch[0] + "</span>" + promptArr[i].substr(valueMatch[0].length) + "</li>";
				}
				oul.innerHTML = liEement;
				oul.style.display = "block";
			}
		}
	}

	function ajax(url, option) {
		var oAjax = null;
		if (window.XMLHttpRequest) {
			oAjax = new XMLHttpRequest();
		} else {
			oAjax = new ActiveXObject("Microsoft.XMLHTTP");
		}


		//2连接服务器
		//open(方法，url，是否异步)
		var param = "";
		var data = option.data ? option.data : -1;
		if (typeof(data) === "object") {
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					param += key + "=" + data[key] + "&";
				}
			}
			param.replace(/&$/, "");
		} else {
			param = "timestrap=" + new Date().getTime();
		}
		//3.发送请求
		var type = option.type ? option.type.toUpperCase() : "GET";
		if (type === "GET") {
			oAjax.open("GET", url + "?" + param, true);
			oAjax.send();
		} else {
			oAjax.open("post", url, true);
			oAjax.setRequestHeader("Conten-type", "application/x-www-form-urlencoded");
			oAjax.send(param);
		}

		//4接收返回
		oAjax.onreadystatechange = function() {
			if (oAjax.readyState === 4) {
				if (oAjax.status === 200) {
					option.onsuccess(oAjax.responseText, oAjax);
				} else {
					if (option.onfail) {
						option.onfail(oAjax);
					}
				}
			}
		}

	}

	function addclass(element, newclassname) {
		element.className = newclassname;
	}

	function removeclass(element, oldClassName) {
			var reg = new RegExp("(\\s|^)" + oldClassName + "(\\s|$)");
			element.className = element.className.replace(reg, "");
		}
		/*
		 *用于移除所有的className
		 */
	function removeLiclass() {
		for (var i = 0, len = oli.length; i < len; i++) {
			oli.className = "";
		}
	}

	/**
	 * 删除<span>标签
	 */
	function deleteSpan(stringHtml) {
		var reg = /^<span>(\w)<\/span>(\w)/;
		var stringArr = stringHtml.match(reg);
		if (stringArr) {
			return stringArr[1] + stringArr[2];
		} else {
			return "";
		}
	}

	oul.addEventListener("mouseover", function() {
		removeLiclass();
		addclass(this, "active");
	})
	oul.addEventListener("mouseout", function() {
		removeClass(this, "active");

	})
	oul.addEventListener("click", function() {
		oinput.value = deleteSpan(this.innerHTML);
		oul.style.display = "none";
	})
	oinput.addEventListener("input",function(event){
		var inputvalue=event.target.value;
		inputDeal.handleValue(inputvalue);

	})

})()