var CTS = CTS || {};

CTS.Employee = {
    init : function () {
        var id_employee = CTS.Utils.getURLParameter('id_employee');
        this.bindActions(id_employee);
        this.getEmployee(id_employee);
    },
    bindActions : function (id_employee) {
        var self = this;
        $('#editEmployee').on('click', function () {
            self.editEmployee(id_employee);
        }); 
    },
    getEmployee : function (id_employee) {
        jQuery.ajax({
            type: "POST",
            url: "api/employee/getEmployee.php",
            data: 'id='+ id_employee,
            cache: false,
            success: function(employee) {  
                    $('#info').empty();
                    
                    var dojos = '';
                    for (var i=0;i<employee[0].dojos.length;i++) {
                        if ((i+1)==employee[0].dojos.length)
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + employee[0].dojos[i].name + '&id_dojo=' + employee[0].dojos[i].id + '">' + employee[0].dojos[i].name + '</a>';
                        else
                            dojos = dojos + '<a href="dojo.html?name_dojo=' + employee[0].dojos[i].name + '&id_dojo=' + employee[0].dojos[i].id + '">' + employee[0].dojos[i].name + '</a>, ';
                    }
                    $('#info').append('<p>' + employee[0].lastname + ' ' + employee[0].name + '</p>'
                        +'<p>DNI: ' + employee[0].dni +'</p>'
                        +'<p>Address: ' + employee[0].address +'</p>'
                        +'<p>Phone: ' + employee[0].phone +'</p>'
                        +'<p>Mobile: ' + employee[0].mobile +'</p>'
                        +'<p>Email: ' + employee[0].email +'</p>'
                        +'<p>Facebook: ' + employee[0].facebook +'</p>'
                        +'<p>Twitter: ' + employee[0].twitter +'</p>'
                        +'<p>Dojos: ' + dojos +'</p>'
                        +'<p>Status: ' + employee[0].status +'</p>');
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editEmployee : function (id) {
        this.setModalEmployee('Edit Employee', id);
        this.showModalEditEmployee();
        this.setEmployee(id);
    },
    closeModalEditEmployee : function () {
        $('#modalEditEmployee').modal('hide');
    },
    showModalEditEmployee : function () {
        $('#modalEditEmployee').modal('show');
    },
    setModalEmployee : function (title,id) {
        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditEmployee" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
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
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Employee.saveEmployee(\'' + id + '\');">Save changes</button>'
            +'      </div>');
        
    },
    setEmployee : function (id) {
        jQuery.ajax({
            type: "POST",
            url: "api/employee/getEmployee.php",
            data: 'id='+ id,
            cache: false,
            success: function (atr) {  
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
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    saveEmployee : function (id) {
        var employee = {
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
            url: "api/employee/updateEmployee.php",
            data: JSON.stringify(employee),
            cache: false,
            success: function (response) {  
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue editado correctamente");
                CTS.Employee.closeModalEditEmployee();
                CTS.Employee.getEmployee(id);
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Employee.init();
});