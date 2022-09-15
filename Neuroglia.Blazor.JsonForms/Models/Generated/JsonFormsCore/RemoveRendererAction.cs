namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface RemoveRendererAction
    {
        [System.Text.Json.Serialization.JsonPropertyName("renderer")]
        object Renderer { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("tester")]
        RankedTester Tester { get; set; }

        [System.Text.Json.Serialization.JsonPropertyName("type")]
        string Type { get; set; }

    }
}

