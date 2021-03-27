package com.example.wbdvsp2102sarry94118serverjava.services;

import com.example.wbdvsp2102sarry94118serverjava.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<Widget>();
    {
        Widget w1 = new Widget(123l, "6043d22863561d001713da1c", "IMAGE", 1, "COMMENTS:FIRST-ABC1", null, "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/14112506/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg", null, null,"", "","", "", null);
        Widget w2 = new Widget(124l, "6043d22863561d001713da1c", "LIST", 4, "content is good!", null, null, null, null,"", "","", "",true);
        Widget w3 = new Widget(125l, "604fae8e5e5adc00172d5dd8", "HEADING", 2, "COMMENTS:SECOND-ABC2", null, null, null, null,"", "","", "", null);
        Widget w4 = new Widget(126l, "604fae8e5e5adc00172d5dd8", "PARAGRAPH", 3, "COMMENTS:SECOND-2-ABC2", null, null, null, null,"", "","", "", null);

        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }

    public Widget createWidgetForTopic(String topicId, Widget widget) {

        widget.setTopicId(topicId);
        widget.setId((new Date()).getTime());
        widgets.add(widget);
        return widget;
    }

    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> ws = new ArrayList<Widget>();
        for(Widget w:widgets) {
            if(w.getTopicId().equals(topicId)) {
                ws.add(w);
            }
        }
        return ws;
    }

    public Integer deleteWidget(Long widgetId) {
        int index = -1;
        for(int i = 0; i < widgets.size();i++) {
            if(widgets.get(i).getId().equals(widgetId)){
                index = i;
                widgets.remove(index);
                return 1;
            }
        }
        return -1;

    }

    public Integer updateWidget(Long widgetId, Widget widget) {
        for(int i = 0; i < widgets.size();i++) {
            if(widgets.get(i).getId().equals(widgetId)){
                widgets.set(i, widget);
                return 1;
            }
        }
        return -1;
    }

    public Widget findWidgetForDelete(Long widgetId) {
        for(int i = 0; i < widgets.size();i++) {
            if(widgets.get(i).getId().equals(widgetId)){
                return widgets.get(i);
            }
        }
        return widgets.get(0);
    }
}
