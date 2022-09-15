namespace Neuroglia.Blazor.JsonForms.Models.JsonFormsCore
{

    interface JsonFormsSubStates
    {
        /// <summary>
        /// All available cell renderers.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("cells")]
        JsonFormsCellRendererRegistryEntry[]? Cells { get; set; }

        /// <summary>
        /// Global configuration options.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("config")]
        object? Config { get; set; }

        /// <summary>
        /// Substate for storing mandatory sub-state.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("core")]
        JsonFormsCore? Core { get; set; }

        /// <summary>
        /// I18n settings.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("i18n")]
        JsonFormsI18nState? I18n { get; set; }

        /// <summary>
        /// If true, sets all controls to read-only.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("readonly")]
        bool? Readonly { get; set; }

        /// <summary>
        /// All available renderers.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("renderers")]
        JsonFormsRendererRegistryEntry[]? Renderers { get; set; }

        /// <summary>
        /// The UI schema registry used in detail renderers.
        /// </summary>
        [System.Text.Json.Serialization.JsonPropertyName("uischemas")]
        JsonFormsUISchemaRegistryEntry[]? Uischemas { get; set; }

        public object this[string] { get => throw new System.NotImplementedException(); set => throw new System.NotImplementedException(); }
    }
}

