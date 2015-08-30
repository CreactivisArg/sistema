var CTS = CTS || {};

CTS.Diaries = {
    id_dojo : '',
    name_dojo : '',
    init : function () {
        this.name_dojo = CTS.Utils.getURLParameter('name_dojo');
        this.id_dojo = CTS.Utils.getURLParameter('id_dojo');
        $('#nameDojo').append('<a href="dojo.html?name_dojo=' + this.name_dojo + '&id_dojo=' + this.id_dojo + '">'+this.name_dojo+'</a>');
        this.bindActions();
        this.getDiaries();
    },
    bindActions : function () {
        var self = this;
        // setNewDiary
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewDiary();
        });
    },
    getDiaries : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/getDiary.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#listPanel').empty();

                for (var i=0;i<list.length;i++) {
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].date + ' - ' + list[i].padawan_lastname + ' ' + list[i].padawan_name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Padawan: <a href="padawan.html?id_padawan=' + list[i].id_padawan + '">' + list[i].padawan_lastname + ' ' + list[i].padawan_name + '</a></div>'
                        +'<div class="list-group-item small">Project: <a href="project.html?id_project=' + list[i].id_project + '">' + list[i].project_name + '</a></div>'
                        +'<div class="list-group-item small">Date: ' + list[i].date +'</div>'
                        +'<div class="list-group-item small">Last Week: ' + list[i].last_week +'</div>'
                        +'<div class="list-group-item small">Daily Target: ' + list[i].daily_target +'</div>'
                        +'<div class="list-group-item small">Tools: ' + list[i].tools +'</div>'
                        +'<div class="list-group-item small">Observations: ' + list[i].observations +'</div>'
                        +'<div class="list-group-item small">Attitude: ' + list[i].attitude +'</div>'
                        +'<a class="list-group-item" onclick="CTS.Diaries.editDiary(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'<a class="list-group-item" onclick="CTS.Diaries.deleteDiary(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Delete</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editDiary : function (id) {
        this.setModalDiary('Edit Diary', id);
        CTS.Utils.showModal('modalEditDiary');
        this.setDiary(id);
    },
    setModalDiary : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Diaries.saveDiary(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Diaries.newDiary();">Save changes</button>';

        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditDiary" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="padawan" class="col-sm-2 control-label">Padawan</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="padawan" id="padawan" onchange="CTS.Diaries.setProject(this.value,null)"></select></div></div>'
            +'              <div class="form-group"><label for="project" class="col-sm-2 control-label">Project</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="project" id="project"></select></div></div>'
            +'              <div class="form-group"><label for="date" class="col-sm-2 control-label">Date</label><div class="col-sm-10"><input id="date" type="date" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="last_week" class="col-sm-2 control-label">Last Week</label><div class="col-sm-10"><input id="last_week" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="daily_target" class="col-sm-2 control-label">Daily Target</label><div class="col-sm-10"><input id="daily_target" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="tools" class="col-sm-2 control-label">Tools</label><div class="col-sm-10"><input id="tools" type="text" step="any" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="observations" class="col-sm-2 control-label">Observations</label><div class="col-sm-10"><input id="observations" type="text" step="any" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="attitude" class="col-sm-2 control-label">Attitude</label><div class="col-sm-10"><input id="attitude" type="text" class="form-control"></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
    },
    setDiary : function (id) {
        var id = {
                id_diary: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/getDiary.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (atr) {
                CTS.Diaries.setPadawan(atr[0].id_padawan);
                CTS.Diaries.setProject(atr[0].id_padawan,atr[0].id_project);
                $("#date").val(atr[0].date);
                $("#last_week").val(atr[0].last_week);
                $("#daily_target").val(atr[0].daily_target);
                $("#tools").val(atr[0].tools);
                $("#observations").val(atr[0].observations);
                $("#attitude").val(atr[0].attitude);
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveDiary : function (id) {
        var diary = {
                id_diary: id,
                id_padawan: $("#padawan").val(),
                id_project: $("#project").val(),
                date: $("#date").val(),
                last_week: $("#last_week").val(),
                daily_target: $("#daily_target").val(),
                tools: $("#tools").val(),
                observations: $("#observations").val(),
                attitude: $("#attitude").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/updateDiary.php",
            data: JSON.stringify(diary),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El diario fue editado correctamente");
                CTS.Utils.closeModal('modalEditDiary')
                CTS.Diaries.getDiaries();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewDiary : function () {
        this.setModalDiary('New Diary', null);
        CTS.Utils.showModal('modalEditDiary');
        this.setPadawan();
    },
    newDiary : function () {
        var diary = {
                id_padawan: $("#padawan").val(),
                id_project: $("#project").val(),
                date: $("#date").val(),
                last_week: $("#last_week").val(),
                daily_target: $("#daily_target").val(),
                tools: $("#tools").val(),
                observations: $("#observations").val(),
                attitude: $("#attitude").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/newDiary.php",
            data: JSON.stringify(diary),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El diario fue creado correctamente.");
                CTS.Utils.closeModal('modalEditDiary');
                CTS.Diaries.getDiaries();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    deleteDiary : function (id_diary) {
        var id = {
                id_diary: id_diary
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/deleteDiary.php",
            data: JSON.stringify(id),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El diario fue borrado correctamente.");
                CTS.Diaries.getDiaries();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setPadawan : function (id_padawan) {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#padawan').empty();
                $('#padawan').append('<option></option>');
                for (var i=0;i<list.length;i++) {
                    $('#padawan').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                }
                $("#padawan").select2({placeholder: "Select a padawan"});
                if (id_padawan)
                    $('#padawan').val(id_padawan).trigger("change");
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setProject : function (id_padawan,id_project) {
        var id = {
                id_padawan: id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/getProject.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#project').empty();

                for (var i=0;i<list.length;i++) {
                    $('#project').append(
                        '<option value='  + list[i].id +'>' + list[i].name +'</option>'
                    );
                }
                $("#project").select2();
                if (id_project)
                    $('#project').val(id_project).trigger("change");
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Diaries.init();
});