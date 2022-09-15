namespace Neuroglia.Blazor.JsonForms.Models.GeneratedTypes
{
    using Neuroglia.Blazor.JsonForms.Models.JsonFormsCore;
    class StringArrayStringUnionJsonConverter : System.Text.Json.Serialization.JsonConverter<StringArrayStringUnion>
    {
        public override StringArrayStringUnion Read(ref System.Text.Json.Utf8JsonReader reader, System.Type type, System.Text.Json.JsonSerializerOptions options)
        {
            try { return new StringArrayStringUnion { StringArrayValue = System.Text.Json.JsonSerializer.Deserialize<string[]>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            try { return new StringArrayStringUnion { StringValue = System.Text.Json.JsonSerializer.Deserialize<string>(ref reader, options) }; } catch (System.Text.Json.JsonException) { }
            return default;
        }
        public override void Write(System.Text.Json.Utf8JsonWriter writer, StringArrayStringUnion value, System.Text.Json.JsonSerializerOptions options)
        {
            if (value.Type == typeof(string[])) { System.Text.Json.JsonSerializer.Serialize(writer, value.StringArrayValue, options); return; }
            if (value.Type == typeof(string)) { System.Text.Json.JsonSerializer.Serialize(writer, value.StringValue, options); return; }
            writer.WriteNullValue();
        }
    }
    [System.Text.Json.Serialization.JsonConverter(typeof(StringArrayStringUnionJsonConverter))]
    struct StringArrayStringUnion
    {
        public System.Type? Type { get; set; }
        private string[]? _stringArrayValue;
        public string[]? StringArrayValue
        {
            get => _stringArrayValue;
            set
            {
                ClearValue();
                _stringArrayValue = value;
                Type = typeof(string[]);
            }
        }
        public static implicit operator StringArrayStringUnion(string[] value) => new StringArrayStringUnion { StringArrayValue = value };
        public static implicit operator string[]?(StringArrayStringUnion value) => value.StringArrayValue;

        private string? _stringValue;
        public string? StringValue
        {
            get => _stringValue;
            set
            {
                ClearValue();
                _stringValue = value;
                Type = typeof(string);
            }
        }
        public static implicit operator StringArrayStringUnion(string value) => new StringArrayStringUnion { StringValue = value };
        public static implicit operator string?(StringArrayStringUnion value) => value.StringValue;

        public override string? ToString()
        {
            if (Type == typeof(string[])) return StringArrayValue?.ToString();
            if (Type == typeof(string)) return StringValue?.ToString();
            return default;
        }
        public override int GetHashCode()
        {
            if (Type == typeof(string[])) return StringArrayValue?.GetHashCode() ?? 0;
            if (Type == typeof(string)) return StringValue?.GetHashCode() ?? 0;
            return 0;
        }
        private void ClearValue()
        {
            _stringArrayValue = default;
            _stringValue = default;
        }
    }
}
