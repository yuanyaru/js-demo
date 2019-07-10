(function()
{
    const communicator = Ice.initialize();
    console.log('aa');
    async function printString()
    {
        try
        {
            console.log('aa');
            setState(State.Busy);
            const hostname = document.location.hostname || "127.0.0.1";
            const proxy = communicator.stringToProxy(`SimplePrinter:ws -h ${hostname} -p 10000`);
            const printer = await Demo.PrinterPrx.checkedCast(proxy);
            if(printer)
            {
                await printer.printString("Hello ice in browser !");
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
                $("#print").removeClass("disabled").click(printString);
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