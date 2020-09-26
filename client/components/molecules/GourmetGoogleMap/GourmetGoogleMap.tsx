import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GetGourmetListResponseDto } from '../../../generated/graphql';

export interface GourmetGoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  data: GetGourmetListResponseDto[];
}

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const GourmetGoogleMap: React.FC<GourmetGoogleMapProps> = ({ center, data }) => {
  console.log(center);
  return (
    <div style={{ height: '400px', width: 'auto' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCafX8PxjVI-XCHsJ9bFeFbJPnwaZ4cc0M' }}
        center={center}
        zoom={14}
      >
        {data.map((item) => (
          <AnyReactComponent key={item.id} text={'My Marker'} lat={item.lat} lng={item.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default GourmetGoogleMap;
