//---------------------------------------------------
//LISTO LOS DOJOS
//---------------------------------------------------
function getDojos()
{
	jQuery.ajax
    ({
        type: "GET",
        url: "api/dojo/getDojo.php",
        cache: false,
        success: function(list)
        {  
                $('#listPanel').empty();
                
				for (var i=0;i<list.length;i++)
				{ 
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].name +'</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">Address: ' + list[i].address +'</a>'
                        +'<a class="list-group-item small">City: ' + list[i].city +'</a>'
                        +'<a class="list-group-item small">Description: ' + list[i].description +'</a>'
                        +'<a class="list-group-item small">Phone: ' + list[i].phone +'</a>'
                        +'<a class="list-group-item small">Email: ' + list[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + list[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + list[i].twitter +'</a>'
                        +'<a class="list-group-item small">Status: ' + list[i].status +'</a>'
                        +'<a class="list-group-item" href="dojo.html?name_dojo=' + list[i].name + '&id_dojo=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                       	+'<a class="list-group-item" onclick="editDojo(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
				}
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN LISTO LOS DOJOS
//---------------------------------------------------

//---------------------------------------------------
//LISTO TODOS LOS MIEMBROS DEL DOJO
//---------------------------------------------------
function getMembers(id_dojo)
{
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/getMembers.php",
        data: 'id_dojo='+ id_dojo,
        cache: false,
        success: function(dojo)
        {  
                $('#listPanelPadawans').empty();
                for (var i=0;i<dojo[0].padawans.length;i++)
                { 
                    $('#listPanelPadawans').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].padawans[i].id +'" data-parent="#menu">' + dojo[0].padawans[i].lastname + ' ' + dojo[0].padawans[i].name + '</a>'
                        +'<div id="' + dojo[0].padawans[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">DNI: ' + dojo[0].padawans[i].dni +'</a>'
                        +'<a class="list-group-item small">Birthdate: ' + dojo[0].padawans[i].birthdate +'</a>'
                        +'<a class="list-group-item small">Address: ' + dojo[0].padawans[i].address +'</a>'
                        +'<a class="list-group-item small">Phone: ' + dojo[0].padawans[i].phone +'</a>'
                        +'<a class="list-group-item small">Mobile: ' + dojo[0].padawans[i].mobile +'</a>'
                        +'<a class="list-group-item small">Email: ' + dojo[0].padawans[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + dojo[0].padawans[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + dojo[0].padawans[i].twitter +'</a>'
                        +'<a class="list-group-item small">School: ' + dojo[0].padawans[i].school +'</a>'
                        +'<a class="list-group-item small">Status: ' + dojo[0].padawans[i].status +'</a>'
                        +'<a class="list-group-item" onclick="removePadawan(\'' + id_dojo + '\',\'' + dojo[0].padawans[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Padawan</a>'
                        +'</div>');
                }
                $('#listPanelMentors').empty();
                for (var i=0;i<dojo[0].mentors.length;i++)
                { 
                    $('#listPanelMentors').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].mentors[i].id +'" data-parent="#menu">' + dojo[0].mentors[i].lastname + ' ' + dojo[0].mentors[i].name + '</a>'
                        +'<div id="' + dojo[0].mentors[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">DNI: ' + dojo[0].mentors[i].dni +'</a>'
                        +'<a class="list-group-item small">Address: ' + dojo[0].mentors[i].address +'</a>'
                        +'<a class="list-group-item small">Phone: ' + dojo[0].mentors[i].phone +'</a>'
                        +'<a class="list-group-item small">Mobile: ' + dojo[0].mentors[i].mobile +'</a>'
                        +'<a class="list-group-item small">Email: ' + dojo[0].mentors[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + dojo[0].mentors[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + dojo[0].mentors[i].twitter +'</a>'
                        +'<a class="list-group-item small">Status: ' + dojo[0].mentors[i].status +'</a>'
                        +'<a class="list-group-item" onclick="removeMentor(\'' + id_dojo + '\',\'' + dojo[0].mentors[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Mentor</a>'
                        +'</div>');
                }
                $('#listPanelResponsibles').empty();
                for (var i=0;i<dojo[0].responsibles.length;i++)
                { 
                    $('#listPanelResponsibles').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].responsibles[i].id +'" data-parent="#menu">' + dojo[0].responsibles[i].lastname + ' ' + dojo[0].responsibles[i].name + '</a>'
                        +'<div id="' + dojo[0].responsibles[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">DNI: ' + dojo[0].responsibles[i].dni +'</a>'
                        +'<a class="list-group-item small">Address: ' + dojo[0].responsibles[i].address +'</a>'
                        +'<a class="list-group-item small">Phone: ' + dojo[0].responsibles[i].phone +'</a>'
                        +'<a class="list-group-item small">Mobile: ' + dojo[0].responsibles[i].mobile +'</a>'
                        +'<a class="list-group-item small">Email: ' + dojo[0].responsibles[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + dojo[0].responsibles[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + dojo[0].responsibles[i].twitter +'</a>'
                        +'<a class="list-group-item small">Status: ' + dojo[0].responsibles[i].status +'</a>'
                        +'</div>');
                }
                $('#listPanelEmployees').empty();
                for (var i=0;i<dojo[0].employees.length;i++)
                { 
                    $('#listPanelEmployees').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + dojo[0].employees[i].id +'" data-parent="#menu">' + dojo[0].employees[i].lastname + ' ' + dojo[0].employees[i].name + '</a>'
                        +'<div id="' + dojo[0].employees[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">DNI: ' + dojo[0].employees[i].dni +'</a>'
                        +'<a class="list-group-item small">Address: ' + dojo[0].employees[i].address +'</a>'
                        +'<a class="list-group-item small">Phone: ' + dojo[0].employees[i].phone +'</a>'
                        +'<a class="list-group-item small">Mobile: ' + dojo[0].employees[i].mobile +'</a>'
                        +'<a class="list-group-item small">Email: ' + dojo[0].employees[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + dojo[0].employees[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + dojo[0].employees[i].twitter +'</a>'
                        +'<a class="list-group-item small">Status: ' + dojo[0].employees[i].status +'</a>'
                        +'<a class="list-group-item" onclick="removeEmployee(\'' + id_dojo + '\',\'' + dojo[0].employees[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Employee</a>'
                        +'</div>');
                }
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN LISTO TODOS LOS MIEMBROS DEL DOJO
//---------------------------------------------------

//---------------------------------------------------
//EDIT DOJO
//---------------------------------------------------
function editDojo(id)
{
    setModalDojo('Edit Dojo', id);
    showModalEditDojo();
    setDojo(id);
}

function setModalDojo(title, id)
{
    if (id)
        var saveBtn = '<button type="button" class="btn btn-primary" onclick="saveDojo(\'' + id + '\');">Save changes</button>';
    else
        saveBtn = '<button type="button" class="btn btn-primary" onclick="newDojo();">Save changes</button>';
    
    $('#holderModal')
    .empty()
    .append(
		'<!-- Modal -->'
		+'<div class="modal fade" id="modalEditDojo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
		+'  <div class="modal-dialog">'
		+'    <div class="modal-content">'
		+'      <div class="modal-header">'
		+'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		+'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
		+'      </div>'
        +'      <div class="modal-body" align="center">'
        +'          <div  class="input-group-justified" style=" width:80%;">'
        +'              <input id="name" type="text" class="form-control" placeholder="name"><br>'
        +'              <input id="address" type="text" class="form-control" placeholder="address"><br>'
        +'              <input id="city" type="text" class="form-control" placeholder="city"><br>'
        +'              <input id="description" type="text" class="form-control" placeholder="description"><br>'
        +'              <input id="phone" type="text" class="form-control" placeholder="phone"><br>'
        +'              <input id="email" type="text" class="form-control" placeholder="email"><br>'
        +'              <input id="facebook" type="text" class="form-control" placeholder="facebook"><br>'
        +'              <input id="twitter" type="text" class="form-control" placeholder="twitter"><br>'
        
        +'              <label>status:</label>'
        +'                   <select name="status" id="status">'
        +'                  </select>'
        
        +'          </div>'
		+'      </div>'
        +'      <div class="modal-footer">'
        +'        <button type="button" class="btn btn-default" onclick="closeModalEditDojo()">Close</button>'
        +           saveBtn
        +'      </div>');
}

function closeModalEditDojo()
{
    $('#modalEditDojo').modal('hide');
}

function showModalEditDojo ()
{
    $('#modalEditDojo').modal('show');
}

function setDojo(id)
{
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/getDojo.php",
        data: 'id='+ id,
        cache: false,
        success: function(atr)
        {  
			document.getElementById("name").value = atr[0].name; 
            document.getElementById("address").value = atr[0].address;
            document.getElementById("city").value = atr[0].city;
            document.getElementById("description").value = atr[0].description;
            document.getElementById("phone").value = atr[0].phone;
            document.getElementById("email").value = atr[0].email;
            document.getElementById("facebook").value = atr[0].facebook;
            document.getElementById("twitter").value = atr[0].twitter;
            setStatus(atr[0].id_status,'status')
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}

function saveDojo(id)
{
    var dojo = {
            id: id,
            name: $("#name").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            description: $("#description").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            facebook: $("#facebook").val(),
            twitter: $("#twitter").val(),
            id_status: $("#status").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/updateDojo.php",
        data: JSON.stringify(dojo),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Dojo fue editado correctamente");
            closeModalEditDojo();
            getDojos();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN EDIT DOJO
//---------------------------------------------------

//---------------------------------------------------
//NEW DOJO
//---------------------------------------------------
function setNewDojo()
{
    setModalDojo('New Dojo', null);
    showModalEditDojo();
    setStatus(null,'status');
}

function newDojo()
{
    var dojo = {
            name: $("#name").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            description: $("#description").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            facebook: $("#facebook").val(),
            twitter: $("#twitter").val(),
            id_status: $("#status").val()
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/newDojo.php",
        data: JSON.stringify(dojo),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Dojo fue creado correctamente.");
            closeModalEditDojo();
            getDojos();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN NEW DOJO
//---------------------------------------------------

//---------------------------------------------------
//AGREGAR PADAWAN
//---------------------------------------------------
function addPadawanDojo(id_dojo)
{
    setModalAddPadawan('Add Padawan',id_dojo);
    showModalAddPadawan();
    setPadawans();
}

function setModalAddPadawan(title, id_dojo)
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
        +'       <button type="button" class="btn btn-primary" onclick="addPadawan(\'' + id_dojo + '\');">Add Padawan</button>'
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

function addPadawan(id_dojo)
{
    var ids = {
            id_dojo: id_dojo,
            padawans: $("#padawans").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/addPadawan.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
            closeModalAddPadawan();
            getMembers(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN AGREGAR PADAWAN
//---------------------------------------------------

//---------------------------------------------------
//AGREGAR MENTOR
//---------------------------------------------------
function addMentorDojo(id_dojo)
{
    setModalAddMentor('Add Mentor',id_dojo);
    showModalAddMentor();
    setMentors();
}

function setModalAddMentor(title, id_dojo)
{   
    $('#holderModal')
    .empty()
    .append(
        '<!-- Modal -->'
        +'<div class="modal fade" id="modalAddMentor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
        +'  <div class="modal-dialog">'
        +'    <div class="modal-content">'
        +'      <div class="modal-header">'
        +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
        +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
        +'      </div>'
        +'      <div class="modal-body" align="center">'
        +'          <div  class="input-group-justified" style=" width:80%;">'
        +'              <label>Mentors:</label>'
        +'                   <select class="mentors-multiple" multiple="multiple" style="width: 80%" name="mentors" id="mentors">'
        +'                  </select>'
        +'          </div>'
        +'      </div>'
        +'      <div class="modal-footer">'
        +'        <button type="button" class="btn btn-default" onclick="closeModalAddMentor()">Close</button>'
        +'       <button type="button" class="btn btn-primary" onclick="addMentor(\'' + id_dojo + '\');">Add Mentor</button>'
        +'      </div>');
}

function closeModalAddMentor()
{
    $('#modalAddMentor').modal('hide');
}

function showModalAddMentor()
{
    $('#modalAddMentor').modal('show');
}

function setMentors()
{
    jQuery.ajax
    ({
        type: "GET",
        url: "api/mentor/getMentor.php",
        cache: false,
        success: function(list)
        {        
            $('#mentors').empty();
             
            for (var i=0;i<list.length;i++)
            {
                $('#mentors').append(
                    
                    '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                );
                $(".mentors-multiple").select2();
            }
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}

function addMentor(id_dojo)
{
    var ids = {
            id_dojo: id_dojo,
            mentors: $("#mentors").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/addMentor.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue agregado correctamente");
            closeModalAddMentor();
            getMembers(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN AGREGAR MENTOR
//---------------------------------------------------

//---------------------------------------------------
//AGREGAR EMPLEADO
//---------------------------------------------------
function addEmployeeDojo(id_dojo)
{
    setModalAddEmployee('Add Employee',id_dojo);
    showModalAddEmployee();
    setEmployees();
}

function setModalAddEmployee(title, id_dojo)
{   
    $('#holderModal')
    .empty()
    .append(
        '<!-- Modal -->'
        +'<div class="modal fade" id="modalAddEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
        +'  <div class="modal-dialog">'
        +'    <div class="modal-content">'
        +'      <div class="modal-header">'
        +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
        +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
        +'      </div>'
        +'      <div class="modal-body" align="center">'
        +'          <div  class="input-group-justified" style=" width:80%;">'
        +'              <label>Employees:</label>'
        +'                   <select class="employees-multiple" multiple="multiple" style="width: 80%" name="employees" id="employees">'
        +'                  </select>'
        +'          </div>'
        +'      </div>'
        +'      <div class="modal-footer">'
        +'        <button type="button" class="btn btn-default" onclick="closeModalAddEmployee()">Close</button>'
        +'       <button type="button" class="btn btn-primary" onclick="addEmployee(\'' + id_dojo + '\');">Add Employee</button>'
        +'      </div>');
}

function closeModalAddEmployee()
{
    $('#modalAddEmployee').modal('hide');
}

function showModalAddEmployee()
{
    $('#modalAddEmployee').modal('show');
}

function setEmployees()
{
    jQuery.ajax
    ({
        type: "GET",
        url: "api/employee/getEmployee.php",
        cache: false,
        success: function(list)
        {        
            $('#employees').empty();
             
            for (var i=0;i<list.length;i++)
            {
                $('#employees').append(
                    
                    '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                );
                $(".employees-multiple").select2();
            }
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}

function addEmployee(id_dojo)
{
    var ids = {
            id_dojo: id_dojo,
            employees: $("#employees").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/addEmployee.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue agregado correctamente");
            closeModalAddEmployee();
            getMembers(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN AGREGAR EMPLEADO
//---------------------------------------------------

//---------------------------------------------------
//REMOVE PADAWAN
//---------------------------------------------------
function removePadawan(id_dojo,id_padawan)
{
    var ids = {
            id_dojo: id_dojo,
            id_padawan: id_padawan
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/removePadawan.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue removido correctamente.");
            loadDojo(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN REMOVE PADAWAN
//---------------------------------------------------

//---------------------------------------------------
//REMOVE PADAWAN
//---------------------------------------------------
function removePadawan(id_dojo,id_padawan)
{
    var ids = {
            id_dojo: id_dojo,
            id_padawan: id_padawan
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/removePadawan.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue removido correctamente.");
            getMembers(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN REMOVE PADAWAN
//---------------------------------------------------

//---------------------------------------------------
//REMOVE MENTOR
//---------------------------------------------------
function removeMentor(id_dojo,id_mentor)
{
    var ids = {
            id_dojo: id_dojo,
            id_mentor: id_mentor
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/removeMentor.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue removido correctamente.");
            getMembers(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN REMOVE MENTOR
//---------------------------------------------------

//---------------------------------------------------
//REMOVE EMPLEADO
//---------------------------------------------------
function removeEmployee(id_dojo,id_employee)
{
    var ids = {
            id_dojo: id_dojo,
            id_employee: id_employee
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/dojo/removeEmployee.php",
        data: JSON.stringify(ids),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue removido correctamente.");
            getMembers(id_dojo);
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN REMOVE EMPLEADO
//---------------------------------------------------