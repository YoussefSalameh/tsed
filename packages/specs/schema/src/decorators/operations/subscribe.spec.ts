import {OperationVerbs} from "../../constants/OperationVerbs";
import {JsonEntityStore} from "../../domain/JsonEntityStore";
import {Publish} from "./publish";
import {Subscribe} from "./subscribe";

describe("Subscribe", () => {
  it("should register operation with Subscribe verb", () => {
    // WHEN
    class Test {
      @Publish("event")
      @Subscribe("event")
      test() {}
    }

    const endpoint = JsonEntityStore.fromMethod(Test, "test");

    // THEN
    expect([...endpoint.operation!.operationPaths.values()]).toEqual([
      {
        method: OperationVerbs.SUBSCRIBE,
        path: "event"
      },
      {
        method: OperationVerbs.PUBLISH,
        path: "event"
      }
    ]);
    expect(endpoint.propertyKey).toBe("test");
  });
});
