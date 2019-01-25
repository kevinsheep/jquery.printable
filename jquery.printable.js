/**
 * @description jQuery Print Previw Plugin v1.0.1
 * @author kevinsheep
 */
(function($) {
    $.loadPrintPreview = function() {
        var print_frame = $('<div id="print_content"><iframe scrolling="no" border="0" frameborder="0" name="print_frame" style="width: 100%;height: 100%;" /></div>');
        top.$('body').append(print_frame);
        top.layer.open({
            type: 1,
            title: '打印预览',
            content: print_frame,
            btn: ['打印', '取消'],
            area: ['90%', '90%'],
            success: function(index, layero) {
                    var print_frame_ref = print_frame.find("iframe").get(0).contentDocument;
                    print_frame_ref.open();
                    print_frame_ref.write('<!doctype html><html lang="zh-cmn-Hans"><head><style>body{height:100%;} .printBox{padding: 0 20px 20px;height:100%;overflow: auto;}</style></head><body></body></html>');
                    print_frame_ref.close();
                    var $iframe_head = $('head').clone();
                    var $iframe_body = $('.printBox').clone();
                    $iframe_head.each(function() {
                        $(this).attr('media', 'all');
                    });
                    $iframe_body.find("#print").hide();
                    top.$('head', print_frame_ref).append($iframe_head);
                    top.$('body', print_frame_ref).append($iframe_body);

                },
            'yes': function(index, layero) {
                    var iframeWin = top.window[layero.find('iframe')[0]['name']];
                    iframeWin.print();
                    top.layer.close(index);
                }
        }); 
    };

    $.fn.printPreview = function() {
        var isChrome = (navigator.userAgent.toLowerCase().indexOf("chrome") != -1);
        this.each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                if (isChrome) {
                    window.print();
                }
                else {
                    $.loadPrintPreview();
                }
            });
        });
        return this;
    };

})(jQuery);