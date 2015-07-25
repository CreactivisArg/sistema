//---------------------------------------------------
//LISTO LOS MENTORES
//---------------------------------------------------
function getMentors()
{
	jQuery.ajax
    ({
        type: "GET",
        url: "api/mentor/getMentor.php",
        cache: false,
        success: function(list)
        {  
                $('#listPanel').empty();
                
				for (var i=0;i<list.length;i++)
				{ 
				    var dojos = '';
                    for (var j=0;j<list[i].dojos.length;j++){
                        if ((j+1)==list[i].dojos.length)
                            dojos = dojos + list[i].dojos[j].name;
                        else
                            dojos = dojos + list[i].dojos[j].name + ', ';
                    }
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">DNI: ' + list[i].dni +'</a>'
                        +'<a class="list-group-item small">Address: ' + list[i].address +'</a>'
                        +'<a class="list-group-item small">Phone: ' + list[i].phone +'</a>'
                        +'<a class="list-group-item small">Mobile: ' + list[i].mobile +'</a>'
                        +'<a class="list-group-item small">Email: ' + list[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + list[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + list[i].twitter +'</a>'
                        +'<a class="list-group-item small">Dojos: ' + dojos +'</a>'
                        +'<a class="list-group-item small">Status: ' + list[i].status +'</a>'
                       	+'<a class="list-group-item" onclick="editMentor(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
				}
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN LISTO LOS MENTORES
//---------------------------------------------------

//---------------------------------------------------
//LISTO LOS MENTORES POR DOJO
//---------------------------------------------------
function getMentorsDojo(id_dojo,id_div)
{
    jQuery.ajax
    ({
        type: "POST",
        url: "api/mentor/getMentor.php",
        data: 'id_dojo='+ id_dojo,
        cache: false,
        success: function(list)
        {  
                $('#'+id_div).empty();
                
                for (var i=0;i<list.length;i++)
                { 
                    $('#'+id_div).append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<a class="list-group-item small">DNI: ' + list[i].dni +'</a>'
                        +'<a class="list-group-item small">Address: ' + list[i].address +'</a>'
                        +'<a class="list-group-item small">Phone: ' + list[i].phone +'</a>'
                        +'<a class="list-group-item small">Mobile: ' + list[i].mobile +'</a>'
                        +'<a class="list-group-item small">Email: ' + list[i].email +'</a>'
                        +'<a class="list-group-item small">Facebook: ' + list[i].facebook +'</a>'
                        +'<a class="list-group-item small">Twitter: ' + list[i].twitter +'</a>'
                        +'<a class="list-group-item small">Status: ' + list[i].status +'</a>'
                        +'<a class="list-group-item" onclick="removeMentor(\'' + id_dojo + '\',\'' + list[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Remove Mentor</a>'
                        +'</div>');
                }
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN LISTO LOS MENTORES POR DOJO
//---------------------------------------------------

//---------------------------------------------------
//EDIT MENTOR
//---------------------------------------------------
function editMentor(id)
{
    setModalMentor('Edit Mentor', id);
    showModalEditMentor();
    setMentor(id);
}

function setModalMentor(title, id)
{
    if (id)
        var saveBtn = '<button type="button" class="btn btn-primary" onclick="saveMentor(\'' + id + '\');">Save changes</button>';
    else
        saveBtn = '<button type="button" class="btn btn-primary" onclick="newMentor();">Save changes</button>';
    
    $('#holderModal')
    .empty()
    .append(
		'<!-- Modal -->'
		+'<div class="modal fade" id="modalEditMentor" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
		+'  <div class="modal-dialog">'
		+'    <div class="modal-content">'
		+'      <div class="modal-header">'
		+'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		+'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
		+'      </div>'
        +'      <div class="modal-body" align="center">'
        +'          <div  class="input-group-justified" style=" width:80%;">'
        +'              <input id="name" type="text" class="form-control" placeholder="name"><br>'
        +'              <input id="lastname" type="text" class="form-control" placeholder="lastname"><br>'
        +'              <input id="dni" type="text" class="form-control" placeholder="dni"><br>'
        +'              <input id="phone" type="text" class="form-control" placeholder="phone"><br>'
        +'              <input id="mobile" type="text" class="form-control" placeholder="mobile"><br>'
        +'              <input id="email" type="text" class="form-control" placeholder="email"><br>'
        +'              <input id="facebook" type="text" class="form-control" placeholder="facebook"><br>'
        +'              <input id="twitter" type="text" class="form-control" placeholder="twitter"><br>'
        +'              <input id="address" type="text" class="form-control" placeholder="address"><br>'
        +'              <label>status:</label>'
        +'                   <select name="status" id="status">'
        +'                  </select>'
        
        +'          </div>'
		+'      </div>'
        +'      <div class="modal-footer">'
        +'        <button type="button" class="btn btn-default" onclick="closeModalEditMentor()">Close</button>'
        +           saveBtn
        +'      </div>');
}

function closeModalEditMentor()
{
    $('#modalEditMentor').modal('hide');
}

function showModalEditMentor()
{
    $('#modalEditMentor').modal('show');
}

function setMentor(id)
{
    jQuery.ajax
    ({
        type: "POST",
        url: "api/mentor/getMentor.php",
        data: 'id='+ id,
        cache: false,
        success: function(atr)
        {  
			document.getElementById("name").value = atr[0].name; 
            document.getElementById("lastname").value = atr[0].lastname;
            document.getElementById("dni").value = atr[0].dni;
            document.getElementById("phone").value = atr[0].phone;
            document.getElementById("mobile").value = atr[0].mobile;
            document.getElementById("email").value = atr[0].email;
            document.getElementById("facebook").value = atr[0].facebook;
            document.getElementById("twitter").value = atr[0].twitter;
            document.getElementById("address").value = atr[0].address;
            setStatus(atr[0].id_status,'status')
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}

function saveMentor(id)
{
    var mentor = {
            id: id,
            name: $("#name").val(),
            lastname: $("#lastname").val(),
            dni: $("#dni").val(),
            phone: $("#phone").val(),
            mobile: $("#mobile").val(),
            email: $("#email").val(),
            facebook: $("#facebook").val(),
            twitter: $("#twitter").val(),
            address: $("#address").val(),
            id_status: $("#status").val()
        };

    jQuery.ajax
    ({
        type: "POST",
        url: "api/mentor/updateMentor.php",
        data: JSON.stringify(mentor),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue editado correctamente");
            closeModalEditMentor();
            getMentors();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN EDIT MENTOR
//---------------------------------------------------

//---------------------------------------------------
//NEW MENTOR
//---------------------------------------------------
function setNewMentor()
{
    setModalMentor('New Mentor', null);
    showModalEditMentor();
    setStatus(null,'status');
}

function newMentor()
{
    var mentor = {
            name: $("#name").val(),
            lastname: $("#lastname").val(),
            dni: $("#dni").val(),
            phone: $("#phone").val(),
            mobile: $("#mobile").val(),
            email: $("#email").val(),
            facebook: $("#facebook").val(),
            twitter: $("#twitter").val(),
            address: $("#address").val(),
            id_status: $("#status").val()
        };
   
    jQuery.ajax
    ({
        type: "POST",
        url: "api/mentor/newMentor.php",
        data: JSON.stringify(mentor),
        cache: false,
        success: function(response)
        {  
            showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Mentor fue creado correctamente.");
            closeModalEditMentor();
            getMentors();
        },
        error: function(){
            showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
        }
    });
}
//---------------------------------------------------
//FIN NEW MENTOR
//---------------------------------------------------