package com.example.wbdvsp2102sarry94118serverjava.controllers;

import com.example.wbdvsp2102sarry94118serverjava.models.Widget;
import com.example.wbdvsp2102sarry94118serverjava.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {

    @Autowired
    WidgetService service;

    @PostMapping("/api/topics/{tid}/widgets")
    public Widget createWidgetForTopic(
            @PathVariable("tid") String topicId,
            @RequestBody Widget widget) {

        return service.createWidgetForTopic(topicId, widget);
    }


    @GetMapping("/api/widgets")
    public List<Widget> findAllWidgets() {
        return service.findAllWidgets();
    }

//    @GetMapping("/api/widgets/{wid}")
//    public Widget findWidgetForDelete(@PathVariable("wid")Long widgetId) {
//        return service.findWidgetForDelete(widgetId);
//    }

    @GetMapping("/api/topics/{tid}/widgets")
    public List<Widget> findWidgetsForTopic(@PathVariable("tid") String topicsId) {
        return service.findWidgetsForTopic(topicsId);
    }

    @DeleteMapping("/api/widgets/{wid}")
    public Integer deleteWidget(
            @PathVariable("wid")Long widgetId) {
        return service.deleteWidget(widgetId);

    }

    @PutMapping("/api/widgets/{wid}")
    public Integer updateWidget(
            @PathVariable("wid") Long widgetId,
            @RequestBody Widget widget) {
        return service.updateWidget(widgetId, widget);
    }
}
