function getVoice(page, count) {

    let table = $("#voiceList tbody");
    table.empty();
    let outPut = '';

    let i =0;
    while (i<10){
        outPut += `<tr>
                    <td>${i+1}</td>
                    <td>تضویحات ددلاین موبایل</td>
                    <td>${moment().format("jYYYY/jMM/jDD - HH:mm")}</td>
                    <td><audio id="myAudio" controls src="../voice/test.mp3" controlslist="nodownload noplaybackrate">
                     
                    </audio></td>

                    <td style="min-width:200px">این صدا مربوط می شود به توضیحات ددلاین موبایل که استاد سر کلاس دادند</td>
                    <td>
                        <div class="list-icons">
                            <div class="dropdown">
                                <a href="#" class="list-icons-item dropdown-toggle d-flex justify-content-end" data-toggle="dropdown">
                                    <i class="icon-cog6"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="../voice/test.mp3" download class="dropdown-item">
                                        <i class="icon-download icon_download"></i>دانلود
                                    </a>
                                    <a tag="` + i + `" class="dropdown-item deleteVoice">
                                        <i class="icon-trash icon_delete"></i>حذف
                                    </a>
  

                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`
        i =i+1
    }



    table.append(outPut);
    newPaginate(25, count, "p-voices", getVoice, 1)


}
getVoice(1,10)