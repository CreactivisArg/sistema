var CTS = CTS || {};

CTS.Employee = {
    id_employee : '',
    employee : {},
    init : function () {
        this.id_employee = CTS.Utils.getURLParameter('id_employee');
        this.bindActions();
        this.getEmployee();
    },
    bindActions : function () {
        var self = this;
        $('#editEmployee').on('click', function () {
            self.editEmployee();
        });
    },
    getEmployee : function () {
        jQuery.ajax({
            type: "POST",
            url: "api/employee/getEmployee.php",
            data: 'id='+ this.id_employee,
            cache: false,
            success: function(employee) {
                    CTS.Employee.employee = employee[0];
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
    editEmployee : function () {
        this.setModalEmployee('Edit Employee');
        CTS.Utils.showModal('modalEditEmployee');
        this.setEmployee();
    },
    setModalEmployee : function (title) {
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
            +'              <input id="dni" type="number" class="form-control" placeholder="dni"><br>'
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
            +'        <button type="button" class="btn btn-primary" onclick="CTS.Employee.saveEmployee();">Save changes</button>'
            +'      </div>');
    },
    setEmployee : function () {
        $("#name").val(this.employee.name);
        $("#lastname").val(this.employee.lastname);
        $("#dni").val(this.employee.dni);
        $("#phone").val(this.employee.phone);
        $("#mobile").val(this.employee.mobile);
        $("#email").val(this.employee.email);
        $("#facebook").val(this.employee.facebook);
        $("#twitter").val(this.employee.twitter);
        $("#address").val(this.employee.address);
        CTS.Utils.setStatus(this.employee.id_status,'status');
    },
    saveEmployee : function () {
        var employee = {
                id: this.id_employee,
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
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El Empleado fue editado correctamente");
                CTS.Utils.closeModal('modalEditEmployee');
                CTS.Employee.getEmployee();
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