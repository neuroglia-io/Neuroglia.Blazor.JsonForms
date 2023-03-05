namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    public interface AddRendererAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("renderer")]
        object Renderer { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        RankedTester Tester { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

