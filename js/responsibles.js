var CTS = CTS || {};

CTS.Responsibles = {
    init : function () {
        this.bindActions();
        this.getResponsibles();
    },
    bindActions : function () {
        var self = this;
        // setNewResponsible
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewResponsible();
        }); 
    },
    getResponsibles : function () {
        jQuery.ajax({
            type: "GET",
            url: "api/responsible/getResponsible.php",
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
                        $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname + ' ' + list[i].name + '</a>'
                            +'<div id="' + list[i].id +'" class="sublinks collapse">'
                            +'<a class="list-group-item small">DNI: ' + list[i].dni +'</a>'
                            +'<a class="list-group-item small">Address: ' + list[i].address +'</a>'
                            +'<a class="list-group-item small">Phone: ' + list[i].phone +'</a>'
                            +'<a class="list-group-item small">Mobile: ' + list[i].mobile +'</a>'
                            +'<a class="list-group-item small">Email: ' + list[i].email +'</a>'
                            +'<a class="list-group-item small">Facebook: ' + list[i].facebook +'</a>'
                            +'<a class="list-group-item small">Twitter: ' + list[i].twitter +'</a>'
                            +'<a class="list-group-item small">Status: ' + list[i].status +'</a>'
                            +'<a class="list-group-item small">Padawans: ' + padawans +'</a>'
                            +'<a class="list-group-item" onclick="CTS.Responsibles.editResponsible(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                            +'<a class="list-group-item" onclick="CTS.Responsibles.addPadawanResponsible(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-plus"></span> Add Padawan</a>'
                            +'</div>');
                    }
            },
            error: function(){
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editResponsible : function (id) {
        this.setModalResponsible('Edit Responsible', id);
        this.showModalEditResponsible();
        this.setResponsible(id);
    },
    closeModalEditResponsible : function () {
        $('#modalEditResponsible').modal('hide');
    },
    showModalEditResponsible : function () {
        $('#modalEditResponsible').modal('show');
    },
    setModalResponsible : function (title, id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Responsibles.saveResponsible(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Responsibles.newResponsible();">Save changes</button>';
    
        $('#holderModal').empty().append(
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
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
        
    },
    setResponsible : function (id) {
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/getResponsible.php",
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
                CTS.Utils.setStatus(atr[0].id_status,'status')
            },
            error: function(){
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveResponsible : function (id) {
        var responsible = {
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
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/updateResponsible.php",
            data: JSON.stringify(responsible),
            cache: false,
            success: function(response)
            {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Responsable fue editado correctamente");
                CTS.Responsibles.closeModalEditResponsible();
                CTS.Responsibles.getResponsibles();
            },
            error: function(){
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewResponsible : function () {
        this.setModalResponsible('New Responsible', null);
        this.showModalEditResponsible();
        CTS.Utils.setStatus(null,'status');
    },
    newResponsible : function () {
        var responsible = {
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
        jQuery.ajax({
            type: "POST",
            url: "api/responsible/newResponsible.php",
            data: JSON.stringify(responsible),
            cache: false,
            success: function(response)
            {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Responsable fue creado correctamente.");
                CTS.Responsibles.closeModalEditResponsible();
                CTS.Responsibles.getResponsibles();
            },
            error: function(){
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });   
    },
    addPadawanResponsible : function (id_responsible) {
        this.setModalAddPadawan('Add Padawan',id_responsible);
        this.showModalAddPadawan();
        this.setPadawans();
    },
    setModalAddPadawan : function (title, id_responsible){
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
            +'       <button type="button" class="btn btn-primary" onclick="CTS.Responsibles.addPadawan(\'' + id_responsible + '\');">Add Padawan</button>'
            +'      </div>');
    },
    closeModalAddPadawan : function(){
        $('#modalAddPadawan').modal('hide');
    },
    showModalAddPadawan : function(){
        $('#modalAddPadawan').modal('show');
    },
    setPadawans : function(){
        jQuery.ajax({
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
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    addPadawan : function(id_responsible){
        var ids = {
                id_responsible: id_responsible,
                padawans: $("#padawans").val()
            };
        jQuery.ajax
        ({
            type: "POST",
            url: "api/responsible/addPadawan.php",
            data: JSON.stringify(ids),
            cache: false,
            success: function(response)
            {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Padawan fue agregado correctamente");
                CTS.Responsibles.closeModalAddPadawan();
                CTS.Responsibles.getResponsibles();
            },
            error: function(){
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Responsibles.init();
});