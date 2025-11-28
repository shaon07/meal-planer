import { AlertTriangle } from "lucide-react";
import { Component, type ReactNode } from "react";
import Button from "../../atoms/Button";
import ErrorBox from "../../atoms/ErrorBox";
import Typography from "../../atoms/Typography";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="mb-4">
              <Typography
                prefix={<AlertTriangle className="w-6 h-6 text-red-600 mr-2" />}
              >
                Something went wrong
              </Typography>
            </div>

            <p className="text-gray-600 mb-4">
              We encountered an unexpected error. Please refresh the page to try
              again.
            </p>

            <div className="flex flex-col gap-3">
              {this.state.error && (
                <ErrorBox error={this.state.error.message} />
              )}

              <div>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
