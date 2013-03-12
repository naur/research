/*
 * Script：
 *              贾睿之
 * Email：
 *              jiaruizhi@360buy.com
 * Usage:
 *      $('.link_className').flyout({prompt: '采购单号'});
 */

define(['jquery'], function($) {
    $.flyout = function(options) {
        var opt = $.extend({
            target: null,
            placementTarget: null,
            panes: '.flyout_panes',
            placement: 'right',        //备用 : Bottom、Right、Mouse、Left、Top
            X: null,
            Y: null,
            offset: null,
            prompt: 'Click',
            isHitTestVisible: true,
            eventType: 'click',  //click, mouse,
            html: '<input type="text"/>' +
                '<input type="button" value="Add"/>' +
                '<ol></ol>'
        }, options);

        opt.panes_close = opt.panes + ' a:first';
        opt.panes_input_text = opt.panes + ' input:text';
        opt.panes_input_button = opt.panes + ' input:button';
        opt.panes_ol = opt.panes + ' ol';
        opt.panes_ol_li = opt.panes + ' ol li';
        opt.panes_ol_li_span = opt.panes + ' ol li span';
        opt.panes_delete = opt.panes + ' ol li a';

        opt.init = function() {
            if (!$(opt.panes).length) {
                $('body').append('<div class="' + opt.panes.replace('.', '') + '"><a></a><div></div></div>');
                $(opt.panes_close).live('click', function() {
                    opt.hide();
                });
            }
            $(opt.panes + ' div').html(opt.html);
        }
        opt.show = function() {
            if (opt.reset) {
                opt.reset();
            }
            $(opt.panes).show();
            //$(opt.panes).toggle('show');
            switch (opt.placement) {
                case 'right':
                    opt.offset = {
                        top: $(opt.placementTarget).offset().top - 4,
                        left: $(opt.placementTarget).offset().left + $(opt.placementTarget).width() + 6
                    }
                    break;
                case 'left':
                    opt.offset = {
                        top: $(opt.placementTarget).offset().top - 4,
                        left: $(opt.placementTarget).offset().left - $(opt.panes).width() - 20
                    }
                    break;
            }
            $(opt.panes).offset(opt.offset);
        };
        opt.hide = function() {
            $(opt.panes).toggle('hide');
            //$(opt.panes).fadeOut(1000);
        };
        opt.catchData = function() {
            var temp_id = '';
            var temp_text = '';
            $(opt.panes_ol_li_span).each(function(index, value) {
                temp_id += ($(this).text() + ',');
                temp_text = $(this).text();
            });
            temp_id = temp_id.replace(/,$/, '');
            $(opt.placementTarget).attr('tag', temp_id);
            $(opt.placementTarget).text((temp_text.length <= 0) ? opt.prompt : temp_text);
            $(opt.placementTarget).attr('title', temp_id);

            //return temp_id.replace(/,$/, '');
        };
        $(opt.panes_input_button).live('click', function() {
            if ($(opt.panes_input_text).val() == '') {
                return false;
            }
            if (opt.placementTarget != null) {
                $(opt.panes_ol).append('<li><span>' + $(opt.panes_input_text).val() + '</span><a></a></li>');
                opt.catchData();
                //$(opt.placementTarget).attr('tag', ($(opt.placementTarget).attr('tag') == null ? '' : $(opt.placementTarget).attr('tag') + ',') + $(opt.panes_input_text).val());
            }
            $(opt.panes_input_text).val('');
        });
        $(opt.panes_delete).live('click', function() {
            $(this).parent().remove();
            opt.catchData();
        });

        if (!opt.reset && opt.isHitTestVisible) {
            opt.reset = function() {
                $(opt.panes_input_text).val('');
                $(opt.panes_ol).empty();

                if ($(opt.placementTarget).attr('tag') == null || $(opt.placementTarget).attr('tag') == '') {
                    return false;
                }
                var tagArray = $(opt.placementTarget).attr('tag').split(',');
                for (i = 0; i < tagArray.length; i++) {
                    $(opt.panes_ol).append('<li><span>' + tagArray[i] + '</span><a></a></li>');
                }
            };
        }
        switch (opt.eventType) {
            case 'click':
                $(opt.target).live('click', function() {
                    opt.placementTarget = this;
                    opt.show();
                });
                break;
            case 'mouse':
                $(opt.panes).live('mouseout', function() {
                    opt.hide();
                });
                $(opt.panes).live('mouseover', function() {
                    opt.placementTarget = this;
                    opt.show();
                });
                break;
        }

        opt.init();
        if (!opt.target) {
            opt.show();
        }
    };

    $.fn.flyout = function(options) {
        if (options == null) {
            options = {};
        }
        options.target = this;
        $.flyout(options);
        return this;
    }
});
