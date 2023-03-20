import './style.css';
import {Feature, Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';



function createStyle(src) {
  return new Style({
    image: new Icon({
      anchor: [0.5, 0.96],
      crossOrigin: "anonymous",
      src,
      width: 40,
      height: 40,
    })
  })
}

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
  ],
  view: new View({
    center: [111.53, 114.5],
    zoom: 2
  })
});

map.on('loadend', () => {
  // map.addInteraction(select);
})


map.on('click', (e) => {
  const coordinate = e.coordinate
  console.log("触发地图点击事件:", coordinate);
  if(coordinate) {
    const view = map.getView()
    console.log('获取渲染的视图：', view);
    const iconFeature = new Feature(new Point(coordinate))

    iconFeature.set('style', createStyle('./images/dog.png'))
    const layer = new VectorLayer({
      style: function (feature) {
        return feature.get('style')
      },
      source: new VectorSource({ features: [iconFeature] })
    })
    setTimeout(() => {
      map.addLayer(layer)
      view.setCenter(coordinate)
      view.setZoom(8)
    }, 1000)
  }
})
