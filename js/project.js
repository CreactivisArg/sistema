//---------------------------------------------------
//LISTO LOS PROYECTOS
//---------------------------------------------------
function getProjects()
{
	jQuery.ajax
    ({
        type: "GET",
        url: "api/project/getProject.php",
        cache: false,
        success: function(list)
        {  
                $('#listPanel').empty();
                
				for (var i=0;i<list.length;i++)
				{ 
                    var padawans = '';
                    for (var j=0;j<list[i].padawans.length;j++){
                        if ((j+1)==list[i].padawans.length)
                            padawans = padawans + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name;
                        else
                            padawans = padawans + list[i].padawans[j].lastname + ' ' + list[i].padawans[j].name + ', ';
                    }
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">Track: ' + list[i].track +'</a>'
                        +'<a class="list-group-item small">Description: ' + list[i].description +'</a>'
                        +'<a class="list-group-item small">Target: ' + list[i].target +'</a>'
                        +'<a class="list-group-item small">Why: ' + list[i].why +'</a>'
                        +'<a class="list-group-item small">Who: ' + list[i].who +'</a>'
                        +'<a class="list-group-item small">Scope: ' + list[i].scope +'</a>'
                        +'<a class="list-group-item small">Status: ' + list[i].status +'</a>'
                        +'<a class="list-group-item small">Padawans: ' + padawans +'</a>'
                       	+'<a class="list-group-item" onclick="editProject(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'<a class="list-group-item" onclick="addPadawanProject(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-plus"></span> Add Padawan</a>'
                        +'</div>');
				}
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN LISTO LOS PROYECTOS
//---------------------------------------------------

//---------------------------------------------------
//EDIT PROYECTO
//---------------------------------------------------
function editProject(id)
{
    setModalProject('Edit Project', id);
    showModalEditProject();
    setProject(id);
}

function setModalProject(title, id)
{
    if (id)
        var saveBtn = '<button type="button" class="btn btn-primary" onclick="saveProject(\'' + id + '\');">Save changes</button>';
    else
        saveBtn = '<button type="button" class="btn btn-primary" onclick="newProject();">Save changes</button>';
    
    $('#holderModal')
    .empty()
    .append(
		'<!-- Modal -->'
		+'<div class="modal fade" id="modalEditResponsible" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
		+'  <div class="modal-dialog">'
		+'    <div class="modal-content">'
		+'      <div class="modal-header">'
		+'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		+'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
		+'      </div>'
        +'      <div class="modal-body" align="center">'
        +'          <div  class="input-group-justified" style=" width:80%;">'
        +'              <input id="name" type="text" class="form-control" placeholder="name"><br>'
        +'              <input id="track" type="text" class="form-control" placeholder="track"><br>'
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
        +'        <button type="button" class="btn btn-default" onclick="closeModalEditProject()">Close</button>'
        +           saveBtn
        +'      </div>');
}

function closeModalEditProject()
{
    $('#modalEditProject').modal('hide');
}

function showModalEditProject()
{
    $('#modalEditProject').modal('show');
}

function setProject(id)
{
    jQuery.ajax
    ({
        type: "POST",
        url: "api/project/getProject.php",
        data: 'id='+ id,
        cache: false,
        success: function(atr)
        {  
			document.getElementById("name").value = atr[0].name; 
            document.getElementById("track").value = atr[0].track;
            document.getElementById("description").value = atr[0].description;
            document.getElementById("target").value = atr[0].target;
            document.getElementById("why").value = atr[0].why;
            document.getElementById("who").value = atr[0].who;
            document.getElementById("scope").value = atr[0].scope;
            setStatus(atr[0].id_status,'status')
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}

function saveProject(id)
{
    var project = {
            id: id,
            name: $("#name").val(),
            track: $("#track").val(),
            description: $("#description").val(),
            target: $("#target").val(),
            why: $("#why").val(),
            who: $("#who").val(),
            scope: $("#scope").val(),
            id_status: $("#status").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/project/updateProject.php",
        data: JSON.stringify(project),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Proyecto fue editado correctamente");
            closeModalEditProject();
            getProjects();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN EDIT PROYECTO
//---------------------------------------------------

//---------------------------------------------------
//NEW PROYECTO
//---------------------------------------------------
function setNewProject()
{
    setModalProject('New Project', null);
    showModalEditProject();
    setStatus(null,'status');
}

function newProject()
{
    var project = {
            name: $("#name").val(),
            track: $("#track").val(),
            description: $("#description").val(),
            target: $("#target").val(),
            why: $("#why").val(),
            who: $("#who").val(),
            scope: $("#scope").val(),
            id_status: $("#status").val()
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/project/newProject.php",
        data: JSON.stringify(project),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Proyecto fue creado correctamente.");
            closeModalEditProject();
            getProjects();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });   
}
//---------------------------------------------------
//FIN NEW PROYECTO
//---------------------------------------------------

//---------------------------------------------------
//AGREGAR PADAWAN
//---------------------------------------------------
function addPadawanProject(id_project)
{
    setModalAddPadawan('Add Padawan',id_project);
    showModalAddPadawan();
    setPadawans();
}

function setModalAddPadawan(title, id_project)
{   
    $('#holderModal')
    .empty()
    .append(
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
        +'        <button type="button" class="btn btn-default" onclick="closeModalAddPadawan()">Close</button>'
        +'       <button type="button" class="btn btn-primary" onclick="addPadawan(\'' + id_project + '\');">Add Padawan</button>'
        +'      </div>');
}

function closeModalAddPadawan()
{
    $('#modalAddPadawan').modal('hide');
}

function showModalAddPadawan()
{
    $('#modalAddPadawan').modal('show');
}

function setPadawans()
{
    jQuery.ajax
    ({
        type: "GET",
        url: "api/padawan/getPadawan.php",
        cache: false,
        success: function(list)
        {        
            $('#padawans').empty();
             
            for (var i=0;i<list.length;i++)
            {
                $('#padawans').append(
                    
                    '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                );
            }
            $(".padawans-multiple").select2();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}

function addPadawan(id_project)
{
    var ids = {
            id_project: id_project,
            padawans: $("#padawans").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/project/addPadawan.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
            closeModalAddPadawan();
            getProjects();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN AGREGAR PADAWAN
//---------------------------------------------------