(function()
{
    const communicator = Ice.initialize();
    var pIDs = new Array("0");
    var ycstatus;
    var ycdata = new Array();
    async function RPCGetRealtimeYCData()
    {
        try
        {
            setState(State.Busy);
            const proxy = communicator.stringToProxy(`DataCommand:ws -h 192.168.100.170 -p 10000`);
            const dataCommand = await CommandArea.DataCommandPrx.checkedCast(proxy);
            if(dataCommand)
            {
                const[ycstatus, ycdata] = await dataCommand.RPCGetRealtimeYCData(pIDs);
                window.alert(ycstatus);
                document.write(ycdata[0].status,"&nbsp;&nbsp;"+ ycdata[0].value, "&nbsp;&nbsp;"+ ycdata[0].timetag);
            }
            else
            {
                $("#output").val("Invalid proxy");
            }
        }
        catch(ex)
        {
            $("#output").val(ex.toString());
        }
        finally
        {
            setState(State.Idle);
        }
    }
    const State =
        {
            Idle: 0,
            Busy: 1
        };
    function setState(newState)
    {
        switch(newState)
        {
            case State.Idle:
            {
                // Hide the progress indicator.
                $("#progress").hide();
                $("body").removeClass("waiting");
                // Enable the button
                $("#print").removeClass("disabled").click(RPCGetRealtimeYCData);
                break;
            }
            case State.Busy:
            {
                // Clear any previous error messages.
                $("#output").val("");
                // Disable buttons.
                $("#print").addClass("disabled").off("click");
                // Display the progress indicator and set the wait cursor.
                $("#progress").show();
                $("body").addClass("waiting");
                break;
            }
        }
    }
    setState(State.Idle);
}());