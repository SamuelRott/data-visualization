import React  from "react";
import filter from "lodash/filter";

class ActiveChannels extends React.Component 
{

    constructor(props)
		{
        super(props);
    }

    handleData = (channels) =>
		{
        return channels.map(channelValue =>
				{
            if (!channelValue.tracks)
            {
                return {
                    timestamp : 0,
                    title     : channelValue.title,
                };
            }

            else if (!channelValue.updated)
            {
                return {
                    timestamp : 0,
                    title     : channelValue.title,
                };
            }
            return {
                timestamp : channelValue.updated,
                title     : channelValue.title,
            };
        });
    };


    lastMonth = () =>
    {
        const channels = this.props.channels;
        const timestamp = this.handleData(channels);
        const now = Date.now();
        const thirtyDays = 2592000000;
        const lastActiveDay = now - thirtyDays;
        const ActiveChannels = filter(timestamp, (channels) =>
        {
            return channels.timestamp > lastActiveDay;
        });

        return ActiveChannels.length;
    };

    render()
    {

        return (

          <div>
            <h1>Currently {this.props.channels.length} channels on radio4000, {this.lastMonth()} were active the last 30 days.</h1>
            <h1>With a total of {this.props.tracks.length} tracks.</h1>
          </div>


        );
    }
}


export default ( ActiveChannels );
