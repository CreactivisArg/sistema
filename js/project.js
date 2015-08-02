var CTS = CTS || {};

CTS.Project = {
    id_project : '',
    project : {},
    init : function () {
        this.id_project = CTS.Utils.getURLParameter('id_project');
        this.bindActions();
        this.getProject();
    },
    bindActions : function () {
        var self = this;
        $('#editProject').on('click', function () {
            self.editProject();
        });
        $('#addPadawan').on('click', function () {
            self.addPadawanProject();
        });
    },
    getProject : function () {
        jQuery.ajax({
            type: "POST",
            url: "api/project/getProject.php",
            data: 'id='+ this.id_project,
            cache: false,
            success: function(project) {
                    CTS.Project.project = project[0];
                    $('#info').empty();

                    var categories = '';
                    for (var i=0;i<project[0].categories.length;i++) {
                        if ((i+1)==project[0].categories.length)
                            categories = categories + project[0].categories[i].name;
                        else
                            categories = categories + project[0].categories[i].name + ', ';
                    }
                    $('#info').append('<p>' + project[0].name + '</p>'
                        +'<p>Category: ' + categories +'</p>'
                        +'<p>Description: ' + project[0].description +'</p>'
                        +'<p>Target: ' + project[0].target +'</p>'
                        +'<p>Why: ' + project[0].why +'</p>'
                        +'<p>Who: ' + project[0].who +'</p>'
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <input id="name" type="text" class="form-control" placeholder="name"><br>'
            +'              <label>Category:</label>'
            +'              <select class="categories-multiple" multiple="multiple" style="width: 80%" name="categories" id="categories">'
            +'              </select><br><br>'
            +'              <input id="description" type="text" class="form-control" placeholder="description"><br>'
            +'              <input id="target" type="text" class="form-control" placeholder="target"><br>'
            +'              <input id="why" type="text" class="form-control" placeholder="why"><br>'
            +'              <input id="who" type="text" class="form-control" placeholder="who"><br>'
            +'              <input id="scope" type="text" class="form-control" placeholder="scope"><br>'
            +'              <label>status:</label>'
            +'                   <select name="status" id="status">'
            +'                  </select>'
            +'          </div>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Project.saveProject();">Save changes</button>'
            +'      </div>');
    },
    setProject : function () {
        document.getElementById("name").value = this.project.name;
        document.getElementById("description").value = this.project.description;
        document.getElementById("target").value = this.project.target;
        document.getElementById("why").value = this.project.why;
        document.getElementById("who").value = this.project.who;
        document.getElementById("scope").value = this.project.scope;
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
                id: this.id_project,
                name: $("#name").val(),
                categories: $("#categories").val(),
                description: $("#description").val(),
                target: $("#target").val(),
                why: $("#why").val(),
                who: $("#who").val(),
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
    setModalAddPadawan : function (title){
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
            +'          <div  class="input-group-justified" style=" width:80%;">'
            +'              <label>Padawans:</label>'
            +'                   <select class="padawans-multiple" multiple="multiple" style="width: 80%" name="padawans" id="padawans">'
            +'                  </select>'
            +'          </div>'
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
                $(".padawans-multiple").select2();
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