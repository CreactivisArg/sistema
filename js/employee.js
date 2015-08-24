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
        var id = {
                id_employee: this.id_employee
            };
        jQuery.ajax({
            type: "POST",
            url: "api/employee/getEmployee.php",
            data: JSON.stringify(id),
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
                        +'<p>Country: ' + employee[0].country +'</p>'
                        +'<p>State: ' + employee[0].state +'</p>'
                        +'<p>City: ' + employee[0].city +'</p>'
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
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="name" class="col-sm-2 control-label">Name</label><div class="col-sm-10"><input id="name" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="lastname" class="col-sm-2 control-label">Lastname</label><div class="col-sm-10"><input id="lastname" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="dni" class="col-sm-2 control-label">DNI</label><div class="col-sm-10"><input id="dni" type="number" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="phone" class="col-sm-2 control-label">Phone</label><div class="col-sm-10"><input id="phone" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="mobile" class="col-sm-2 control-label">Mobile</label><div class="col-sm-10"><input id="mobile" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="email" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input id="email" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="facebook" class="col-sm-2 control-label">Facebook</label><div class="col-sm-10"><input id="facebook" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="twitter" class="col-sm-2 control-label">Twitter</label><div class="col-sm-10"><input id="twitter" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="country" class="col-sm-2 control-label">Country</label><div class="col-sm-10"><input id="country" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="state" class="col-sm-2 control-label">State</label><div class="col-sm-10"><input id="state" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="city" class="col-sm-2 control-label">City</label><div class="col-sm-10"><input id="city" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="address" class="col-sm-2 control-label">Address</label><div class="col-sm-10"><input id="address" type="text" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="status" class="col-sm-2 control-label">Status</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="status" id="status"></select></div></div>'
            +'          </form>'
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
        $("#country").val(this.employee.country);
        $("#state").val(this.employee.state);
        $("#city").val(this.employee.city);
        $("#address").val(this.employee.address);
        CTS.Utils.setStatus(this.employee.id_status,'status');
    },
    saveEmployee : function () {
        var employee = {
                id_employee: this.id_employee,
                name: $("#name").val(),
                lastname: $("#lastname").val(),
                dni: parseInt($("#dni").val()) ? parseInt($("#dni").val()) : 0,
                phone: $("#phone").val(),
                mobile: $("#mobile").val(),
                email: $("#email").val(),
                facebook: $("#facebook").val(),
                twitter: $("#twitter").val(),
                country: $("#country").val(),
                state: $("#state").val(),
                city: $("#city").val(),
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