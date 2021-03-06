var CTS = CTS || {};

CTS.Project = {
    id_project : '',
    project : {},
    init : function () {
        this.id_project = CTS.Utils.getURLParameter('id_project');
        this.bindActions();
        this.getProject();
        this.getDiaries();
    },
    bindActions : function () {
        var self = this;
        $('#editProject').on('click', function () {
            self.editProject();
        });
        $('#addPadawan').on('click', function () {
            self.addPadawanProject();
        });
        $('#showInfo').on('click', function () {
            self.showInfo();
        });
        $('#showDiaries').on('click', function () {
            self.showDiaries();
        });
    },
    showInfo : function () {
        $('#info').show();
        $('#listDiaries').hide();
        $('#tabInfo').addClass('active');
        $('#tabDiaries').removeClass('active');
    },
    showDiaries : function () {
        $('#info').hide();
        $('#listDiaries').show();
        $('#tabInfo').removeClass('active');
        $('#tabDiaries').addClass('active');
    },
    getProject : function () {
        var id = {
                id_project: this.id_project
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/getProject.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (project) {
                    CTS.Project.project = project[0];
                    $('#info').empty();

                    var categories = '';
                    for (var i=0;i<project[0].categories.length;i++) {
                        if ((i+1)==project[0].categories.length)
                            categories = categories + project[0].categories[i].name;
                        else
                            categories = categories + project[0].categories[i].name + ', ';
                    }
                    $('#info').append('<br><p>' + project[0].name + '</p>'
                        +'<p>Category: ' + categories +'</p>'
                        +'<p>Description: ' + project[0].description +'</p>'
                        +'<p>Objective: ' + project[0].Objective +'</p>'
                        +'<p>Why: ' + project[0].why +'</p>'
                        +'<p>Target: ' + project[0].target +'</p>'
                        +'<p>Scope: ' + project[0].scope +'</p>');
                    if (project[0].padawans.length>0){
                        var padawans = '<p>Padawans:</p><div class="panel list-group">';
                        for (var i=0;i<project[0].padawans.length;i++) {
                            padawans=padawans+'<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + project[0].padawans[i].id +'" data-parent="#menu">' + project[0].padawans[i].lastname + ' ' + project[0].padawans[i].name + '</a>'
                            +'<div id="' + project[0].padawans[i].id +'" class="sublinks collapse">'
                            +'<a class="list-group-item" href="padawan.html?id_padawan=' + project[0].padawans[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                            +'<a class="list-group-item" onclick="CTS.Project.removePadawan(\'' + project[0].padawans[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Padawan</a>'
                            +'</div>';
                        }
                        $('#info').append(padawans +'</div>');
                    }
                    $('#info').append('<p>Status: ' + project[0].status +'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    getDiaries : function () {
        var id = {
                id_project: this.id_project
            };
        jQuery.ajax({
            type: "POST",
            url: "api/diary/getDiary.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#listDiaries').empty();
                for (var i=0;i<list.length;i++) {
                    $('#listDiaries').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].date + ' - ' + list[i].padawan_lastname + ' ' + list[i].padawan_name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Padawan: <a href="padawan.html?id_padawan=' + list[i].id_padawan + '">' + list[i].padawan_lastname + ' ' + list[i].padawan_name + '</a></div>'
                        +'<div class="list-group-item small">Date: ' + list[i].date +'</div>'
                        +'<div class="list-group-item small">Last Week: ' + list[i].last_week +'</div>'
                        +'<div class="list-group-item small">Daily Target: ' + list[i].daily_target +'</div>'
                        +'<div class="list-group-item small">Tools: ' + list[i].tools +'</div>'
                        +'<div class="list-group-item small">Observations: ' + list[i].observations +'</div>'
                        +'<div class="list-group-item small">Attitude: ' + list[i].attitude +'</div>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editProject : function () {
        this.setModalProject('Edit Project');
        CTS.Utils.showModal('modalEditProject');
        this.setProject();
    },
    setModalProject : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditProject" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="name" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="name" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="categories" class="col-sm-2 control-label">Category</label><div class="col-sm-10"><select class="categories-multiple" multiple="multiple" style="width: 100%" name="categories" id="categories"></select></div></div>'
            +'              <div class="form-group"><label for="description" class="col-sm-2 control-label">Description</label><div class="col-sm-10"><input id="description" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="objective" class="col-sm-2 control-label">Objective</label><div class="col-sm-10"><input id="objective" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="why" class="col-sm-2 control-label">Why</label><div class="col-sm-10"><input id="why" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="target" class="col-sm-2 control-label">Target</label><div class="col-sm-10"><input id="target" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="scope" class="col-sm-2 control-label">Scope</label><div class="col-sm-10"><input id="scope" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="status" class="col-sm-2 control-label">Status</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="status" id="status"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Project.saveProject();">Save changes</button>'
            +'      </div>');
    },
    setProject : function () {
        $("#name").val(this.project.name);
        $("#description").val(this.project.description);
        $("#target").val(this.project.target);
        $("#why").val(this.project.why);
        $("#objective").val(this.project.objective);
        $("#scope").val(this.project.scope);
        CTS.Utils.setStatus(this.project.id_status,'status');
        if (this.project.categories.length==0)
            CTS.Utils.getCategories(null,'categories');
        else {
            var categories = [];
            for (var i=0;i<this.project.categories.length;i++) {
                categories.push(this.project.categories[i].id);
            }
            CTS.Utils.getCategories(categories,'categories');
        }
    },
    saveProject : function () {
        var project = {
                id_project: this.id_project,
                name: $("#name").val(),
                categories: $("#categories").val(),
                description: $("#description").val(),
                target: $("#target").val(),
                why: $("#why").val(),
                objective: $("#objective").val(),
                scope: $("#scope").val(),
                id_status: $("#status").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/updateProject.php",
            data: JSON.stringify(project),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Proyecto fue editado correctamente");
                CTS.Utils.closeModal('modalEditProject');
                CTS.Project.getProject();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawanProject : function () {
        this.setModalAddPadawan('Add Padawan');
        CTS.Utils.showModal('modalAddPadawan');
        this.setPadawans();
    },
    setModalAddPadawan : function (title) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalAddPadawan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="padawans" class="col-sm-2 control-label">Padawans</label><div class="col-sm-10"><select class="form-control" multiple="multiple" style="width: 100%" name="padawans" id="padawans"></select></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Project.addPadawan();">Add Padawan</button>'
            +'      </div>');
    },
    setPadawans : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/padawan/getPadawan.php",
            cache: false,
            success: function (list) {
                $('#padawans').empty();

                for (var i=0;i<list.length;i++) {
                    $('#padawans').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                }
                $("#padawans").select2();
            },
            error: function() {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawan : function () {
        var ids = {
                id_project: this.id_project,
                padawans: $("#padawans").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/addPadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
                CTS.Utils.closeModal('modalAddPadawan');
                CTS.Project.getProject();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    removePadawan : function (id_padawan) {
        var ids = {
                id_project: this.id_project,
                id_padawan: id_padawan
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/removePadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue removido correctamente.");
                CTS.Project.getProject();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Project.init();
});