let jsonList = [];

__initInputBoxLanguage__();
userCheck();
initForm();
makeField();

$(document).ready(function () {
    $("#sourceTextarea").on("propertychange change input keyup", function (e) {
        var textCountLimit = 4000;
        var textLength = $(this).val().length;
        $("#MTLtextLen").html(textLength);

    })
})

function sourceTextareaClear() {
    document.getElementById("sourceTextarea").value = ""
    $("#MTLtextLen").html(0);

}

function userCheck() {
    if (localStorage.getItem('mulTrans_userId')) {
        return;
    } else {
        localStorage.setItem('mulTrans_userId', uuidv4());
    }
}

function initForm() {
    if (localStorage.getItem('trans_list')) {
        jsonList = jsonList.concat(JSON.parse(localStorage.getItem('trans_list')));
        return;
    } else {
        localStorage.setItem('trans_list', JSON.stringify(
            [
                {
                    id: uuidv4(),
                    classify: 'google',
                    text: '',
                    language: 'ko'
                },
                {
                    id: uuidv4(),
                    classify: 'papago',
                    text: '',
                    language: 'ko'
                },
                {
                    id: uuidv4(),
                    classify: 'amazon',
                    text: '',
                    language: 'ko'
                }
            ]
        ));
        jsonList = jsonList.concat(JSON.parse(localStorage.getItem('trans_list')));
    }
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getField(jsonData) {
    // console.log(jsonData.classify);
    let field = "";
    switch (jsonData.classify) {
        case "google":
            field = `
                        <div class="Mtl-Grid-item Mtl-Grid-sm-6 Mtl-Grid-xs-12">
                            <div class="Mtl-Target-Box-Google">
                                <button class="Mtl-icon-button-small float-right" onclick="handleDeleteTranslator('${jsonData.id}')">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z"/>
                                        <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/>
                                        <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
                                    </svg>
                                </button>
                                <div class="Mtl-title-h5">구글번역기 결과</div>
                                <div style="margin:8px">
                                    <div class="Mtl-Form-Control-root">
                                        <label for="targetLanguage-${jsonData.id}" class="Mtl-label-l1">타겟 언어</label>
                                        <select class="custom-select" name="targetLanguage-${jsonData.id}" id="targetLanguage-${jsonData.id}">
                                            <option value="ko">한국어</option>
                                            <option value="en">영어</option>
                                            <option value="zh-CN">중국어</option>
                                            <option value="ja">일본어</option>
                                            <option value="vi">베트남어</option>
                                            <option value="de">독일어</option>
                                            <option value="es">스페인어</option>
                                            <option value="ru">러시아어</option>
                                            <option value="it">이탈리아어</option>
                                            <option value="fr">프랑스어</option>
                                            <option value="th">태국어</option>
                                            <option value="id">인도네시아어</option>
                                        </select>
                                    </div>
                                    <textarea class="Mtl-Target-Textarea" id="textArea-${jsonData.id}" placeholder="google translator..." readonly></textarea>
                                    <div class="Mtl-Overflow-auto">
                                        <a href="https://translate.google.com/" target="_blank">출처 : 구글</a>
                                        <button class="Mtl-button Mtl-Float-Right Mtl-CopyButton"  id="textCopyBtn-${jsonData.id}" onclick="handleCopyToClipboard('${jsonData.id}',event)">COPY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            return field;
        case "papago":
            field = `
                        <div class="Mtl-Grid-item Mtl-Grid-sm-6 Mtl-Grid-xs-12">
                            <div class="Mtl-Target-Box-Papago">
                                <button class="Mtl-icon-button-small float-right" onclick="handleDeleteTranslator('${jsonData.id}')">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z"/>
                                        <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/>
                                        <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
                                    </svg>
                                </button>
                                <div class="Mtl-title-h5">파파고번역기 결과</div>
                                <div style="margin:8px">
                                    <div class="Mtl-Form-Control-root">
                                        <label for="targetLanguage-${jsonData.id}" class="Mtl-label-l1">타겟 언어</label>
                                        <select class="custom-select" name="targetLanguage-${jsonData.id}" id="targetLanguage-${jsonData.id}">
                                            <option value="ko">한국어</option>
                                            <option value="en">영어</option>
                                            <option value="zh-CN">중국어</option>
                                            <option value="ja">일본어</option>
                                            <option value="vi">베트남어</option>
                                            <option value="de">독일어</option>
                                            <option value="es">스페인어</option>
                                            <option value="ru">러시아어</option>
                                            <option value="it">이탈리아어</option>
                                            <option value="fr">프랑스어</option>
                                            <option value="th">태국어</option>
                                            <option value="id">인도네시아어</option>
                                        </select>
                                    </div>
                                    <textarea class="Mtl-Target-Textarea" id="textArea-${jsonData.id}" placeholder="papago translator..." readonly></textarea>
                                    <div class="Mtl-Overflow-auto">
                                        <a href="https://papago.naver.com/" target="_blank">출처 : 네이버 파파고</a>
                                        <button class="Mtl-button Mtl-Float-Right Mtl-CopyButton"  id="textCopyBtn-${jsonData.id}" onclick="handleCopyToClipboard('${jsonData.id}',event)">COPY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            return field;
        case "amazon":
            field = `
                        <div class="Mtl-Grid-item Mtl-Grid-sm-6 Mtl-Grid-xs-12">
                            <div class="Mtl-Target-Box-Amazon">
                                <div class="float-right">
                                    <button class="Mtl-icon-button-small" onclick="handleDeleteTranslator('${jsonData.id}')">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836L12.82 4H3.18zm.541 9.329A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671L14 3H2l1.721 10.329z"/>
                                            <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/>
                                            <path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div class="Mtl-title-h5">아마존번역기 결과</div>
                                <div style="margin:8px">
                                    <div class="Mtl-Form-Control-root">
                                        <label for="targetLanguage-${jsonData.id}" class="Mtl-label-l1">타겟 언어</label>
                                        <select class="custom-select" name="targetLanguage-${jsonData.id}" id="targetLanguage-${jsonData.id}">
                                            <option value="ko">한국어</option>
                                            <option value="en">영어</option>
                                            <option value="zh-CN">중국어</option>
                                            <option value="ja">일본어</option>
                                            <option value="vi">베트남어</option>
                                            <option value="de">독일어</option>
                                            <option value="es">스페인어</option>
                                            <option value="ru">러시아어</option>
                                            <option value="it">이탈리아어</option>
                                            <option value="fr">프랑스어</option>
                                            <option value="th">태국어</option>
                                            <option value="id">인도네시아어</option>
                                        </select>
                                    </div>
                                    <textarea class="Mtl-Target-Textarea" id="textArea-${jsonData.id}" placeholder="amazon translator..." readonly></textarea>
                                    <div class="Mtl-Overflow-auto">
                                        <a href="https://aws.amazon.com/translate/" target="_blank">출처 : AWS</a>
                                        <button class="Mtl-button Mtl-Float-Right Mtl-CopyButton" id="textCopyBtn-${jsonData.id}" onclick="handleCopyToClipboard('${jsonData.id}',event)">COPY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            return field;
        default: return;
    }
}

function makeField() {
    $("#Mtl-Target-Translator-field").html("");
    for (let i = 0; i < jsonList.length; i++) {
        // $("#Mtl-Grid-Container").append(getField(jsonList[i]));
        $("#Mtl-Target-Translator-field").append(getField(jsonList[i]))
    }
}

function __initInputBoxLanguage__() {
    document.getElementById("rootSourceLanguage").value = 'en';
    document.getElementById("rootTargetLanguage").value = 'ko';
}

function rootTargetLanguageChange() {
    let targetLanguage = document.getElementById("rootTargetLanguage").value;
    subTargetLanguageChange(targetLanguage);
}

function subTargetLanguageChange(language) {
    for (let i = 0; i < jsonList.length; i++) {
        document.getElementById(`targetLanguage-${jsonList[i].id}`).value = language;
    }
}

function handleAddTranslator(classify) {
    if (jsonList.length >= 5) {
        sncakbarOpen("번역기는 최대 5개만 추가 가능합니다.");
    } else {
        let newTranslator = [];
        switch (classify) {
            case "google":
                newTranslator.push(
                    {
                        id: uuidv4(),
                        classify: 'google',
                        text: '',
                        language: 'ko'
                    }
                )
                break;
            case "papago":
                newTranslator.push(
                    {
                        id: uuidv4(),
                        classify: 'papago',
                        text: '',
                        language: 'ko'
                    }
                )
                break;
            case "amazon":
                newTranslator.push(
                    {
                        id: uuidv4(),
                        classify: 'amazon',
                        text: '',
                        language: 'ko'
                    }
                )
                break;
            default: break;
        }
        jsonList = jsonList.concat(newTranslator);
        localStorage.setItem("trans_list", JSON.stringify(jsonList));
        makeField();
    }

    $("#exampleModal").modal('hide')
}

function sncakbarOpen(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

}

function handleDeleteTranslator(id) {
    if (jsonList.length <= 1) {
        sncakbarOpen("최소 1개의 번역기를 유지해야 합니다.");
    } else {
        jsonList = jsonList.filter(x => {
            return x.id != id;
        });
        localStorage.setItem("trans_list", JSON.stringify(jsonList));
        makeField();
    }
}

function handleExchangeRootLanguage() {
    let currentSourceL = document.getElementById("rootSourceLanguage").value;
    let currentTargetL = document.getElementById("rootTargetLanguage").value;
    document.getElementById("rootSourceLanguage").value = currentTargetL;

    document.getElementById("rootTargetLanguage").value = currentSourceL;
    for (let i = 0; i < jsonList.length; i++) {
        document.getElementById(`targetLanguage-${jsonList[i].id}`).value = currentSourceL;
    }
}

function handleCopyToClipboard(target,e) {
    if(target && target==='textArea-sourceCopy'){
        document.getElementById(`sourceTextarea`) ? document.getElementById(`sourceTextarea`).select() : alert('error copy');
    }else{
        document.getElementById(`textArea-${target}`) ? document.getElementById(`textArea-${target}`).select() : alert('error copy');
    }

    if(document.execCommand('copy')){
        sncakbarOpen('COPIED!')
        e.target.focus();
    }
}