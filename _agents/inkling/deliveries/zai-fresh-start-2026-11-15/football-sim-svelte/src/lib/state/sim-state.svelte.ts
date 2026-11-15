export class SimStateBridge {
  state = $state({
    ready: true
  });

  snapshot() {
    return $state.snapshot(this.state);
  }
}
