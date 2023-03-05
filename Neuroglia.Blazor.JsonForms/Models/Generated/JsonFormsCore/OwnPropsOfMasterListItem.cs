namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface OwnPropsOfMasterListItem
    {
        [System.Text.Json.Serialization.JsonPropertyName("index")]
        double Index { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("path")]
        string Path { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("schema")]
        JsonSchema Schema { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("selected")]
        bool Selected { get; set; }

        System.Action HandleSelect(double index);

        System.Action RemoveItem(string path, double value);

    }
}

