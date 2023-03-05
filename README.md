# Neuroglia.Blazor.JsonForms

A Blazor wrapper for [JSON Forms](https://github.com/eclipsesource/jsonforms), relying on their [angular based web component](https://github.com/eclipsesource/jsonforms-angular-webcomponent).

## Demo
- Clone this repo
- Run the `Neuroglia.Blazor.JsonForms.Demo` project

## Usage
- Import the JS and CSS in your `index.html`
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- ... --->
    <!-- JSON Forms related -->
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="_content/Neuroglia.Blazor.JsonForms/lib/jsonforms-angular-webcomponent/styles.css" rel="stylesheet" />
    <!-- End of JSON Forms related -->
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/app.css" rel="stylesheet" />
    <!-- ... --->
</head>

<body>
    <!-- ... --->
    <!-- JSON Forms related -->
    <script src="_content/Neuroglia.Blazor.JsonForms/lib/jsonforms-angular-webcomponent/runtime.js" type="module"></script>
    <script src="_content/Neuroglia.Blazor.JsonForms/lib/jsonforms-angular-webcomponent/polyfills.js" type="module"></script>
    <script src="_content/Neuroglia.Blazor.JsonForms/lib/jsonforms-angular-webcomponent/vendor.js" type="module"></script>
    <script src="_content/Neuroglia.Blazor.JsonForms/lib/jsonforms-angular-webcomponent/main.js" type="module"></script>
    <!-- End of JSON Forms related -->
    <!-- ... --->
    <script src="_framework/blazor.webassembly.js"></script>
    <!-- ... --->
</body>

</html>

```

- Add the `JsonFormsJsInterop` service to the DI configuration in your `Program.cs` or `Startup.cs`:
```csharp
//...
builder.Services.AddSingleton<JsonFormsJsInterop>();
//...
```

- Use the `JsonForm` component in your razor:
```razor
@using System.Text.Json

<label>
    Read Only
    <input type="checkbox" checked="@readOnly" @onchange="e => this.readOnly = !this.readOnly" />
</label>
<JsonForm 
    Schema="schema" 
    UISchema="uischema" 
    Data="data" 
    Options="options"
    ReadOnly="readOnly"
    DataChange="OnDataChange"
></JsonForm>
<h2>Form value</h2>
<pre>
    @JsonSerializer.Serialize(this._data);
</pre>

@code {
    private object schema = JsonSerializer.Deserialize<object>($@"{{
        ""type"": ""object"",
        ""title"": ""Person"",
        ""properties"": {{
          ""name"": {{
            ""type"": ""string"",
            ""minLength"": 3
          }},
          ""birthDate"": {{
            ""type"": ""string"",
            ""format"": ""date""
          }},
          ""foo"": {{
            ""type"": ""boolean"",
            ""default"": true
          }}
        }}
      }}")!; // Used JSON because of `default`

    private object uischema = new
    {
        type = "VerticalLayout",
        elements = new[]
        {
            new
            {
                type = "Control",
                scope = "#/properties/foo",
                label = "Toggle fields visibility"
            } as object,
            new
            {
                type = "HorizontalLayout",
                rule = new
                {
                    effect = "SHOW",
                    condition = new
                    {
                        type = "LEAF",
                        scope =  "#/properties/foo",
                        expectedValue = true
                    }
                },
                elements = new []
                {
                    new
                    {
                        type = "Control",
                        scope = "#/properties/name"
                    },
                    new
                    {
                        type = "Control",
                        scope = "#/properties/birthDate"
                    }
                }
            } as object
    }
    };

    private object options = new
    {
        useDefaults = true
    };

    private object data = new
    {
        name = 3
    };

    // prevents data loop between setting the component `Data` parameter and reading the component data change
    private object _data = new
    {
        name = 3
    };

    private bool readOnly = false;

    private void OnDataChange(object data)
    {
        this._data = data;
        this.StateHasChanged();
    }
}
```