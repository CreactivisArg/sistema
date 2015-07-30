var CTS = CTS || {};

CTS.Dojos = {
    init : function () {
        this.bindActions();
        this.getDojos();
    },
    bindActions : function () {
        var self = this;
        // setNewDojo
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewDojo();
        }); 
    },
    getDojos : function () {
        var i = 0;
        jQuery.ajax({
            type: "GET",
            url: "api/dojo/getDojo.php",
            cache: false,
            success: function(list) {  
                $('#listPanel').empty();
                
                for (i; i < list.length; i++) { 
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].name +' - ' + list[i].city + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Address: ' + list[i].address +'</div>'
                        +'<div class="list-group-item small">City: ' + list[i].city +'</div>'
                        +'<div class="list-group-item small">Description: ' + list[i].description +'</div>'
                        +'<div class="list-group-item small">Phone: ' + list[i].phone +'</div>'
                        +'<div class="list-group-item small">Email: ' + list[i].email +'</div>'
                        +'<div class="list-group-item small">Facebook: ' + list[i].facebook +'</div>'
                        +'<div class="list-group-item small">Twitter: ' + list[i].twitter +'</div>'
                        +'<div class="list-group-item small">Status: ' + list[i].status +'</div>'
                        +'<a class="list-group-item" href="dojo.html?name_dojo=' + list[i].name + '&id_dojo=' + list[i].id + '"><span class="glyphicon glyphicon-eye-open"></span> View</a>'
                        +'<a class="list-group-item" onclick="CTS.Dojos.editDojo(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editDojo : function (id) {
        this.setModalDojo('Edit Dojo', id);
        this.showModalEditDojo();
        this.setDojo(id);
    },
    closeModalEditDojo : function () {
	    $('#modalEditDojo').modal('hide');
	},
    showModalEditDojo : function () {
        $('#modalEditDojo').modal('show');
    },
    setModalDojo : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Dojos.saveDojo(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Dojos.newDojo();">Save changes</button>';
    
        $('#holderModal').empty().append(
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
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
        
    },
    setDojo : function (id) {
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/getDojo.php",
            data: 'id='+ id,
            cache: false,
            success: function (atr) {  
                document.getElementById("name").value = atr[0].name; 
                document.getElementById("address").value = atr[0].address;
                document.getElementById("city").value = atr[0].city;
                document.getElementById("description").value = atr[0].description;
                document.getElementById("phone").value = atr[0].phone;
                document.getElementById("email").value = atr[0].email;
                document.getElementById("facebook").value = atr[0].facebook;
                document.getElementById("twitter").value = atr[0].twitter;
                CTS.Utils.setStatus(atr[0].id_status,'status')
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveDojo : function (id) {
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
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/updateDojo.php",
            data: JSON.stringify(dojo),
            cache: false,
            success: function (response) {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Dojo fue editado correctamente");
                CTS.Dojos.closeModalEditDojo();
                CTS.Dojos.getDojos();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewDojo : function () {
        this.setModalDojo('New Dojo', null);
        this.showModalEditDojo();
        CTS.Utils.setStatus(null,'status');
    },
    newDojo : function () {
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
        jQuery.ajax({
            type: "POST",
            url: "api/dojo/newDojo.php",
            data: JSON.stringify(dojo),
            cache: false,
            success: function (response) {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Dojo fue creado correctamente.");
                CTS.Dojos.closeModalEditDojo();
                CTS.Dojos.getDojos();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Dojos.init();
});