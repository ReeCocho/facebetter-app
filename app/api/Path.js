const app_name = 'facebetter'
exports.buildPath = 
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:8001/' + route;
    }
}

exports.buildPathWs = 
function buildPathWs()
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'wss://' + app_name +  '.herokuapp.com/';
    }
    else
    {        
        return 'ws://localhost:8001/';
    }
}