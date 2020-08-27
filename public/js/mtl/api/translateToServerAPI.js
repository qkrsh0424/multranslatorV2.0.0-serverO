$("#mtlTranslateSubmit").submit(
    function mtlTranslateSubmit(e) {
        e.preventDefault();
        // $(document).ready(function () {
        var jsonList = [];

        if (localStorage.getItem('trans_list')) {
            jsonList = jsonList.concat(JSON.parse(localStorage.getItem('trans_list')));
        }
        
        var sourceData = JSON.stringify({
            text:$("#sourceTextarea").val(),
            language:$("#rootSourceLanguage").val()
        });

        for(let i = 0 ; i < jsonList.length;i++){
            var targetData = JSON.stringify({
                id:jsonList[i].id,
                language:$(`#targetLanguage-${jsonList[i].id}`).val(),
                classify:jsonList[i].classify
            });
            if(jsonList[i].classify==='google'){
                getGoogleResultAPI(sourceData,targetData);
            }else if(jsonList[i].classify==='papago'){
                getPapagoResultAPI(sourceData,targetData);
            }else if(jsonList[i].classify==='amazon'){
                getAmazonResultAPI(sourceData, targetData);
            }else{
                alert("server connect failed");
            }
        }
    }
);

function getGoogleResultAPI(sourceData, targetData){
    $.ajax({
        type: "POST", //전송방식을 지정한다 (POST,GET)
        url: "/api/translate/google",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
        dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
        data: {
            sourceData : sourceData,
            targetData: targetData
        },
        error: function () {
            alert("server connect failed");
        },
        success: function (Parse_data) {
            // console.log(Parse_data);
            let resData = JSON.parse(Parse_data);
            if(resData.message==='success'){
                $(`#textArea-${resData.targetData.id}`).html(resData.translatedText);
            }else if(resData.message==='checkLanguage'){
                alert("check the language, source and target languages doesn't same.(hint:google translator)");
            }else{
                alert("Critical Error, 관리자에게 문의해 주세요.")
            }
        }

    });
}

function getPapagoResultAPI(sourceData, targetData){
    $.ajax({
        type: "POST", //전송방식을 지정한다 (POST,GET)
        url: "/api/translate/papago",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
        dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
        data: {
            sourceData : sourceData,
            targetData: targetData
        },
        error: function () {
            alert("server connect failed");
        },
        success: function (Parse_data) {
            let resData = JSON.parse(Parse_data);
            if(resData.message==='success'){
                $(`#textArea-${resData.targetData.id}`).html(resData.translatedText);
            }else if(resData.message==='checkLanguage'){
                alert("check the language, source and target languages doesn't same.(hint:google translator)");
            }else{
                alert("Critical Error, 관리자에게 문의해 주세요.")
            }
        }

    });
}

function getAmazonResultAPI(sourceData, targetData){
    $.ajax({
        type: "POST", //전송방식을 지정한다 (POST,GET)
        url: "/api/translate/amazon",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.
        dataType: "text",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
        data: {
            sourceData : sourceData,
            targetData: targetData
        },
        error: function () {
            alert("server connect failed");
        },
        success: function (Parse_data) {
            let resData = JSON.parse(Parse_data);
            if(resData.message==='success'){
                $(`#textArea-${resData.targetData.id}`).html(resData.translatedText);
            }else if(resData.message==='checkLanguage'){
                alert("check the language, source and target languages doesn't same.(hint:google translator)");
            }else{
                alert("Critical Error, 관리자에게 문의해 주세요.")
            }
        }

    });
}