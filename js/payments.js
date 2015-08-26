var CTS = CTS || {};

CTS.Payments = {
    id_dojo : '',
    name_dojo : '',
    init : function () {
        this.name_dojo = CTS.Utils.getURLParameter('name_dojo');
        this.id_dojo = CTS.Utils.getURLParameter('id_dojo');
        $('#nameDojo').append('<a href="dojo.html?name_dojo=' + this.name_dojo + '&id_dojo=' + this.id_dojo + '">'+this.name_dojo+'</a>');
        this.bindActions();
        this.getPayments();
    },
    bindActions : function () {
        var self = this;
        // setNewPayment
        $('.jumbotron .btn-primary').on('click', function () {
            self.setNewPayment();
        });
    },
    getPayments : function () {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/payment/getPayment.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#listPanel').empty();

                for (var i=0;i<list.length;i++) {
                    $('#listPanel').append('<a href="#" class="list-group-item" data-toggle="collapse" data-target="#' + list[i].id +'" data-parent="#menu">' + list[i].lastname_padawan + ' ' + list[i].name_padawan + ' - ' + list[i].month + '/' +  list[i].year + '</a>'
                        +'<div id="' + list[i].id +'" class="sublinks collapse">'
                        +'<div class="list-group-item small">Padawan: <a href="padawan.html?id_padawan=' + list[i].id_padawan + '">' + list[i].lastname_padawan + ' ' + list[i].name_padawan + '</a></div>'
                        +'<div class="list-group-item small">Month: ' + list[i].month + '/' +  list[i].year +'</div>'
                        +'<div class="list-group-item small">Date: ' + list[i].date +'</div>'
                        +'<div class="list-group-item small">Amount: ' + list[i].amount +'</div>'
                        +'<div class="list-group-item small">Method: ' + list[i].method +'</div>'
                        +'<div class="list-group-item small">Observation: ' + list[i].observation +'</div>'
                        +'<a class="list-group-item" onclick="CTS.Payments.editPayment(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-pencil"></span> Edit</a>'
                        +'<a class="list-group-item" onclick="CTS.Payments.deletePayment(\'' + list[i].id + '\')"><span class="glyphicon glyphicon-remove"></span> Delete</a>'
                        +'</div>');
                }
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    editPayment : function (id) {
        this.setModalPayment('Edit Payment', id);
        CTS.Utils.showModal('modalEditPayment');
        this.setPayment(id);
    },
    setModalPayment : function (title,id) {
        var saveBtn = (id) ? '<button type="button" class="btn btn-primary" onclick="CTS.Payments.savePayment(\'' + id + '\');">Save changes</button>' : '<button type="button" class="btn btn-primary" onclick="CTS.Payments.newPayment();">Save changes</button>';

        $('#holderModal').empty().append(
            '<!-- Modal -->'
            +'<div class="modal fade" id="modalEditPayment" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
            +'  <div class="modal-dialog">'
            +'    <div class="modal-content">'
            +'      <div class="modal-header">'
            +'        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
            +'        <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
            +'      </div>'
            +'      <div class="modal-body" align="center">'
            +'          <form class="form-horizontal">'
            +'              <div class="form-group"><label for="padawan" class="col-sm-2 control-label">Padawan</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="padawan" id="padawan"></select></div></div>'
            +'              <div class="form-group"><label for="month" class="col-sm-2 control-label">Month</label><div class="col-sm-10"><input id="month" type="number" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="year" class="col-sm-2 control-label">Year</label><div class="col-sm-10"><input id="year" type="number" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="amount" class="col-sm-2 control-label">Amount</label><div class="col-sm-10"><input id="amount" type="number" step="any" class="form-control"></div></div>'
            +'              <div class="form-group"><label for="method" class="col-sm-2 control-label">Method</label><div class="col-sm-10"><select class="form-control" style="width: 100%" name="method" id="method"></select></div></div>'
            +'              <div class="form-group"><label for="observation" class="col-sm-2 control-label">Observation</label><div class="col-sm-10"><input id="observation" type="text" class="form-control"></div></div>'
            +'          </form>'
            +'      </div>'
            +'      <div class="modal-footer">'
            +'        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
            +           saveBtn
            +'      </div>');
    },
    setPayment : function (id) {
        var id = {
                id_payment: id
            };
        jQuery.ajax({
            type: "POST",
            url: "api/payment/getPayment.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (atr) {
                $("#month").val(atr[0].month);
                $("#year").val(atr[0].year);
                $("#amount").val(atr[0].amount);
                $("#observation").val(atr[0].observation);
                CTS.Payments.setMethod(atr[0].id_method);
                CTS.Payments.setPadawan(atr[0].id_padawan);
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    savePayment : function (id) {
        var payment = {
                id_payment: id,
                month: parseInt($("#month").val()) ? parseInt($("#month").val()) : 0,
                year: parseInt($("#year").val()) ? parseInt($("#year").val()) : 0,
                amount: parseFloat($("#amount").val()) ? parseFloat($("#amount").val()) : 0.0,
                id_method: $("#method").val(),
                observation: $("#observation").val(),
                id_dojo: this.id_dojo,
                id_padawan: $("#padawan").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/payment/updatePayment.php",
            data: JSON.stringify(payment),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El pago fue editado correctamente");
                CTS.Utils.closeModal('modalEditPayment')
                CTS.Payments.getPayments();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setNewPayment : function () {
        this.setModalPayment('New Payment', null);
        CTS.Utils.showModal('modalEditPayment');
        this.setPadawan();
        this.setMethod();
    },
    newPayment : function () {
        var payment = {
                month: parseInt($("#month").val()) ? parseInt($("#month").val()) : 0,
                year: parseInt($("#year").val()) ? parseInt($("#year").val()) : 0,
                amount: parseFloat($("#amount").val()) ? parseFloat($("#amount").val()) : 0.0,
                id_method: $("#method").val(),
                observation: $("#observation").val(),
                id_dojo: this.id_dojo,
                id_padawan: $("#padawan").val()
            };
        jQuery.ajax({
            type: "POST",
            url: "api/payment/newPayment.php",
            data: JSON.stringify(payment),
            cache: false,
            success: function (response) {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El pago fue creado correctamente.");
                CTS.Utils.closeModal('modalEditPayment');
                CTS.Payments.getPayments();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    deletePayment : function (id_payment) {
        var id = {
                id_payment: id_payment
            };
        jQuery.ajax({
            type: "POST",
            url: "api/payment/deletePayment.php",
            data: JSON.stringify(id),
            cache: false,
            success: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_INFO,"Confirm","El pago fue borrado correctamente.");
                CTS.Payments.getPayments();
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setPadawan : function (id_padawan) {
        var id = {
                id_dojo: this.id_dojo
            };
        jQuery.ajax({
            type: "POST",
            url: "api/padawan/getPadawan.php",
            data: JSON.stringify(id),
            cache: false,
            success: function (list) {
                $('#padawan').empty();

                for (var i=0;i<list.length;i++) {
                    $('#padawan').append(
                        '<option value='  + list[i].id +'>' + list[i].lastname + ' ' + list[i].name +'</option>'
                    );
                }
                $("#padawan").select2();
                if (id_padawan)
                    $('#padawan').val(id_padawan).trigger("change");
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    },
    setMethod : function (id_method) {
        jQuery.ajax({
            type: "GET",
            url: "api/payment/getMethod.php",
            cache: false,
            success: function (list) {
                $('#method').empty();

                for (var i=0;i<list.length;i++) {
                    $('#method').append(
                        '<option value='  + list[i].id +'>' + list[i].name +'</option>'
                    );
                }
                $("#method").select2();
                if (id_method)
                    $('#method').val(id_method).trigger("change");
            },
            error: function () {
                CTS.Utils.showDialog(BootstrapDialog.TYPE_WARNING,"Error","Ha ocurrido un error, intente nuevamente.");
            }
        });
    }
};

$(function () {
    CTS.Payments.init();
});