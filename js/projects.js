var CTS = CTS || {};

CTS.Projects = {
    init : function () {
        this.bindActions();
        this.getProjects();
    },
    bindActions : function () {
        var self = this;
        // setNewProject
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewProject();
        }); 
    },
    getProjects : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/project/getProject.php",
            cache: false,
            success: function(list) {  
                $('#listPanel').empty();
                
                for (var i=0;i<list.length;i++) { 
                    var categories = '';
                    for (var j=0;j<list[i].categories.length;j++) {
                        if ((j+1)==list[i].categories.length)
                            categories = categories + list[i].categories[j].name;
                        else
                            categories = categories + list[i].categories[j].name + ', ';
                    }
                    var padawans = '';
                    for (var j=0;j<list[i].padawans.length;j++) {
                        if ((j+1)==list[i].padawans.length)
                            padawans = padawans + '<a href="padawan.html?id_padawan=' + list[i].padawans[j].id + '">' + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + '</a>';
                        else
                            padawans = padawans + '<a href="padawan.html?id_padawan=' + list[i].padawans[j].id + '">' + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + '</a>, ';
                    }
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Category: ' + categories +'</div>'
                        +'<div class="list-group-item small">Description: ' + list[i].description +'</div>'
                        +'<div class="list-group-item small">Target: ' + list[i].target +'</div>'
                        +'<div class="list-group-item small">Why: ' + list[i].why +'</div>'
                        +'<div class="list-group-item small">Who: ' + list[i].who +'</div>'
                        +'<div class="list-group-item small">Scope: ' + list[i].scope +'</div>'
                        +'<div class="list-group-item small">Padawans: ' + padawans +'</div>'
                        +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                        +'<a class="list-group-item" onclick="CTS.Projects.editProject(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'<a class="list-group-item" onclick="CTS.Projects.addPadawanProject(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-plus"></span> Add Padawan</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editProject : function (id) {
        this.setModalProject('Edit Project', id);
        this.showModalEditProject();
        this.setProject(id);
    },
    closeModalEditProject : function () {
        $('#modalEditProject').modal('hide');
    },
    showModalEditProject : function () {
        $('#modalEditProject').modal('show');
    },
    setModalProject : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Projects.saveProject(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Projects.newProject();">Save changes</button>';
    
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
            +           saveBtn
            +'      </div>');
        
    },
    setProject : function (id) {
        jQuery.ajax({
            type: "POST",
            url: "api/project/getProject.php",
            data: 'id='+ id,
            cache: false,
            success: function (atr) {  
                document.getElementById("name").value = atr[0].name; 
                document.getElementById("description").value = atr[0].description;
                document.getElementById("target").value = atr[0].target;
                document.getElementById("why").value = atr[0].why;
                document.getElementById("who").value = atr[0].who;
                document.getElementById("scope").value = atr[0].scope;
                CTS.Utils.setStatus(atr[0].id_status,'status');
                CTS.Utils.getCategories('categories');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveProject : function (id) {
        var project = {
                id: id,
                name: $("#name").val(),
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
                CTS.Projects.closeModalEditProject();
                CTS.Projects.getProjects();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewProject : function () {
        this.setModalProject('New Project', null);
        this.showModalEditProject();
        CTS.Utils.setStatus(null,'status');
        CTS.Utils.getCategories('categories');
    },
    newProject : function () {
        var project = {
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
            url: "api/project/newProject.php",
            data: JSON.stringify(project),
            cache: false,
            success: function (response) {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Proyecto fue creado correctamente.");
                CTS.Projects.closeModalEditProject();
                CTS.Projects.getProjects();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });      
    },
    addPadawanProject : function (id_project) {
        this.setModalAddPadawan('Add Padawan',id_project);
        this.showModalAddPadawan();
        this.setPadawans();
    },
    setModalAddPadawan : function (title,id_project){
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
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Projects.addPadawan(\'' + id_project + '\');">Add Padawan</button>'
            +'      </div>');
    },
    closeModalAddPadawan : function () {
        $('#modalAddPadawan').modal('hide');
    },
    showModalAddPadawan : function () {
        $('#modalAddPadawan').modal('show');
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
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawan : function (id_project) {
        var ids = {
                id_project: id_project,
                padawans: $("#padawans").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/project/addPadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function (response) {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
                CTS.Projects.closeModalAddPadawan();
                CTS.Projects.getProjects();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Projects.init();
});